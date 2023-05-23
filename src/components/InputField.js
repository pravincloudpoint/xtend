import { View, Text, TextInput } from "react-native";
import React from "react";
import { Shadow } from "react-native-shadow-2";

import { COLORS, FONTS } from "../constants";

export default function InputField({
  contaynerStyle,
  placeholder,
  icon,
  secureTextEntry,
  title,
  onChangeText,
  editable,
  error,
}) {
  return (
    <Shadow
      viewStyle={{ width: "100%", ...contaynerStyle }}
      startColor={COLORS.shadowStartColor}
      finalColor={COLORS.shadowFinalColor}
      distance={COLORS.shadowDistance}
      style={{ ...contaynerStyle }}
    >
      <View
        style={{
          width: "100%",
          height: 60,
          backgroundColor: COLORS.white,
          borderRadius: 10,
          paddingLeft: 20,
          justifyContent: "center",
          paddingVertical: 8,
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: error ? "red" : COLORS.white,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              ...FONTS.LeagueSpartan_400Regular,
              fontSize: 14,
              color: COLORS.gray,
              lineHeight: 12 * 1.7,
            }}
          >
            {title}
          </Text>
          <TextInput
            style={{ paddingRight: 20, width: "100%" }}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            editable={editable}
          />
     
        </View>
        {icon && icon}
       
      </View>
      {error && (
            <Text
              style={{
                ...FONTS.LeagueSpartan_400Regular,
                fontSize: 12,
                color: 'red',
                marginLeft:10
              }}
            >
              {error.message || "Error"}
            </Text>
          )}
    </Shadow>

  );
}
