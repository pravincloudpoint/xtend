import { View, Text } from "react-native";
import React from "react";

import { COLORS, FONTS } from "../constants";
import { Star } from "../svg";

export default function ratingComponent({ item, containerStyle }) {
    return (
        <View
            style={{
                backgroundColor: COLORS.white,
                position: "absolute",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 7,
                paddingVertical: 1,
                ...containerStyle,
            }}
        >
            <Star />
            <Text
                style={{
                    ...FONTS.Lato_700Bold,
                    fontSize: 10,
                    lineHeight: 10 * 1.7,
                    marginLeft: 3,
                }}
            >
                {item?.rating}
            </Text>
        </View>
    );
}
