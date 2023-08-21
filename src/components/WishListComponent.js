import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";

import { Clock, Heart, Star } from "../svg";
import { COLORS, FONTS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { removeFavorite } from "../Slice/Favorites/AddFavoriteSlice";

export default function WishListComponent({ item, onPress }) {
    // console.log("🚀 ~ WishListComponent ~ item:", item);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    return (
        <TouchableOpacity
            style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#EBEEF5",
                flex: 1,
            }}
            onPress={() =>
                      navigation.navigate("CourseDetails", {
                        item: item,
                      })
                    }
        >
            <ImageBackground
                // source={item.preview_330x330}
                source={{uri:item.image}}
                style={{ width: 110, height: 110 }}
                imageStyle={{ borderRadius: 10 }}
            >
                <View
                    style={{
                        backgroundColor: COLORS.white,
                        position: "absolute",
                        bottom: 2,
                        left: 2,
                        borderBottomLeftRadius: 10,
                        borderTopRightRadius: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 7,
                        paddingVertical: 5,
                    }}
                >
                    {<Star />}
                    <Text
                        style={{
                            ...FONTS.Lato_700Bold,
                            fontSize: 10,
                            marginLeft: 3,
                            color: COLORS.black,
                        }}
                    >
                        {item.rating}
                    </Text>
                </View>
            </ImageBackground>
            <View style={{ flex: 1, paddingVertical: 4, paddingLeft: 12 }}>
                <Text
                    numberOfLines={2}
                    style={{
                        width: "80%",
                        ...FONTS.Lato_500Medium,
                        fontSize: 14,
                        textTransform: "capitalize",
                        lineHeight: 14 * 1.5,
                        color: COLORS.black,
                        marginBottom: 6,
                    }}
                >
                    {item.name}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 9,
                    }}
                >
                    <Clock strokeColor={COLORS.secondaryTextColor} />
                    <Text
                        style={{
                            color: COLORS.secondaryTextColor,
                            lineHeight: 14 * 1.7,
                            marginLeft: 6,
                            ...FONTS.Lato_400Regular,
                            fontSize: 14,
                        }}
                    >
                        {item.duration}
                    </Text>
                </View>

                {/* <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.Lato_400Regular,
                            fontSize: 16,
                            color: COLORS.mainColor,
                        }}
                    >
                        ${item.price}
                    </Text>
                    <TouchableOpacity
                        style={{
                            width: 80,
                            height: 27,
                            borderWidth: 1,
                            borderRadius: 5,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.Lato_400Regular,
                                fontSize: 10,
                                textTransform: "capitalize",
                                color: COLORS.mainColor,
                            }}
                        >
                            buy now
                        </Text>
                    </TouchableOpacity>
                </View> */}
                <TouchableOpacity
                    style={{ position: "absolute", right: 0, top: 2 }}
                    onPress={() => dispatch(removeFavorite(item.id))}
                >
                    <Heart strokeColor={COLORS.pink} fillColor={COLORS.pink} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}
