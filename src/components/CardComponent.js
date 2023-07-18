import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { Clock, Heart, Star, User } from "../svg";
import { COLORS, FONTS } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import {
  addFavorite,
  removeFavorite,
} from "../Slice/Favorites/AddFavoriteSlice";


export default function CardComponent({ item, lastComponent, onPress }) {
// console.log("🚀 ~ CardComponent ~ item:", item);
const dispatch = useDispatch();
const [itemStatus, setItemStatus] = useState(false);
console.log("🚀 ~ CourseDetails ~ itemStatus:", itemStatus);
// console.log("🚀 ~ CourseDetails ~ item:", item);


const addFavoriteItem = (item) => {
  // console.log("🚀 ~ addFavorite ~ item:", item);
  dispatch(addFavorite(item));
  setItemStatus(true);
};

const removeFavoriteItem = (item) => {
  // console.log("🚀 ~ removeFavoriteItem ~ item:", item);
  dispatch(removeFavorite(item.id));
  setItemStatus(false);
};


  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: lastComponent === true ? 0 : 10,
        paddingBottom: lastComponent === true ? 0 : 10,
        borderBottomWidth: lastComponent === true ? 0 : 1,
        borderBottomColor:
          lastComponent === true ? COLORS.transparent : "#EBEEF5",
        flex: 1,
      }}
      onPress={onPress}
    >
      <ImageBackground
        source={item.thumbnail}
        // style={{ width: 160, height: 120 }}
        style={{ width: 160, height: 100 }}
        imageStyle={{ borderRadius: 10,resizeMode: 'stretch'  }}
      >
        {/* <View
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
        </View> */}
      </ImageBackground>
      <View style={{ flex: 1, paddingVertical: 4, paddingLeft: 12 }}>
        <Text
          numberOfLines={2}
          style={{
            flex: 1,
            width: "80%",
            ...FONTS.Lato_500Medium,
            fontSize: 14,
            textTransform: "capitalize",
            lineHeight: 14 * 1.5,
            color: COLORS.black,
          }}
        >
         {item.name? item.name: item.Filename}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            flex: 1,
            width: "80%",
            ...FONTS.Lato_500Medium,
            fontSize: 14,
            textTransform: "capitalize",
            lineHeight: 14 * 1.5,
            color: COLORS.black,
          }}
        >
         {item.class? item.class: item.class}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            flex: 1,
            width: "80%",
            ...FONTS.Lato_500Medium,
            fontSize: 14,
            textTransform: "capitalize",
            lineHeight: 14 * 1.5,
            color: COLORS.black,
          }}
        >
        {item.board? item.board: item.board}
        </Text>
        
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Clock strokeColor={COLORS.secondaryTextColor} />
          <Text
            style={{
              marginLeft: 6,
              flex: 1,
              ...FONTS.Lato_400Regular,
              fontSize: 14,
              color: COLORS.gray,
            }}
          >
            {item.duration}
          </Text>
          {/* <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Text
              style={{
                marginRight: 7,
                textDecorationLine: "line-through",
                ...FONTS.Lato_400Regular,
                fontSize: 12,
                color: COLORS.lightGray,
                lineHeight: 12 * 1.5,
              }}
            >
              {item.oldPrice}
            </Text>
            <Text style={{ ...FONTS.Lato_600SemiBold, fontSize: 16 }}>
              ${item.price}
            </Text>
          </View> */}
      
        </View>
        {itemStatus ? (
              <TouchableOpacity style={{ position: "absolute", right: 0, top: 2 }} onPress={() => removeFavoriteItem(item)}>
                <Heart strokeColor={COLORS.pink} fillColor={COLORS.pink} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={{ position: "absolute", right: 0, top: 2 }} onPress={() => addFavoriteItem(item)}>
                <Heart strokeColor={COLORS.gray} fillColor={COLORS.white} />
              </TouchableOpacity>
            )}
      </View>

    </TouchableOpacity>
  );
}
