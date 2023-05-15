import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { ViewAll } from "../svg";
import { COLORS, FONTS } from "../constants";

export default function CategoryComponent({
    title,
    BtnViewAll = true,
    onPress,
}) {
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginBottom: 10,
            }}
        >
            <Text
                style={{
                    ...FONTS.Spartan_600SemiBold,
                    fontSize: 16,
                    textTransform: "capitalize",
                    lineHeight: 16 * 1.5,
                    color: COLORS.black,
                }}
            >
                {title}
            </Text>
            {BtnViewAll == true && (
                <TouchableOpacity onPress={onPress}>
                    <ViewAll />
                </TouchableOpacity>
            )}
        </View>
    );
}
