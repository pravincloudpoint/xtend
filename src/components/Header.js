import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { Arrow, FilterSvg } from "../svg";

import { COLORS, FONTS } from "../constants";

export default function Header({
    title,
    onPress,
    titleStyle,
    goBack = true,
    clear,
    clearOnPress,
    filter,
    filterOnPress,
}) {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: 42,
            }}
        >
            {goBack && (
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        left: 0,
                        paddingHorizontal: 20,
                    }}
                    onPress={onPress}
                >
                    <Arrow />
                </TouchableOpacity>
            )}
            {title && (
                <Text
                    style={{
                        fontSize: 16,
                        ...FONTS.Spartan_500Medium,
                        color: COLORS.black,
                        textTransform: "capitalize",
                        ...titleStyle,
                    }}
                >
                    {title}
                </Text>
            )}
            {clear && (
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        right: 0,
                        paddingHorizontal: 20,
                    }}
                    onPress={clearOnPress}
                >
                    <Text
                        style={{
                            ...FONTS.Lato_700Bold,
                            fontSize: 14,
                            lineHeight: 14 * 1.7,
                        }}
                    >
                        Clear
                    </Text>
                </TouchableOpacity>
            )}
            {filter && (
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        right: 0,
                        paddingHorizontal: 20,
                    }}
                    onPress={filterOnPress}
                >
                    <FilterSvg />
                </TouchableOpacity>
            )}
        </View>
    );
}
