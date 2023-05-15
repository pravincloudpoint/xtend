import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../constants";
import { Shadow } from "react-native-shadow-2";

import { ProfileCategoryArrow } from "../svg";

export default function ProfileCategoryComponent({
    icon,
    title,
    onPress,
    arrow,
}) {
    return (
        <Shadow
            offset={[0, 0]}
            distance={7}
            startColor={"rgba(6, 38, 100, 0.04)"}
            finalColor={"rgba(6, 38, 100, 0.0)"}
            viewStyle={{ width: "100%", marginBottom: 6 }}
        >
            <TouchableOpacity
                style={{
                    width: "100%",
                    height: 60,
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    borderRadius: 10,
                    paddingHorizontal: 21,

                    borderWidth: 1,
                    borderColor: COLORS.white,
                    flexDirection: "row",
                    alignItems: "center",
                }}
                onPress={onPress}
            >
                <View style={{ marginRight: 12 }}>{icon}</View>
                <Text
                    style={{
                        ...FONTS.Lato_400Regular,
                        fontSize: 16,
                        color: COLORS.black,
                        flex: 1,
                    }}
                >
                    {title}
                </Text>
                {arrow === true && <ProfileCategoryArrow />}
            </TouchableOpacity>
        </Shadow>
    );
}
