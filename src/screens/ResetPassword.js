import { Text, SafeAreaView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { Header, InputField, Button } from "../components";
import { AREA, FONTS, COLORS, SIZES } from "../constants";
import { EyeOff } from "../svg";

export default function ResetPassword() {
    const navigation = useNavigation();

    function renderBackground() {
        return (
            <Image
                source={require("../assets/images/background/background-01.png")}
                style={{
                    position: "absolute",
                    width: SIZES.width,
                    height: SIZES.height,
                    resizeMode: "stretch",
                }}
            />
        );
    }

    function renderHeader() {
        return (
            <Header
                title="Reset password"
                onPress={() => navigation.goBack()}
            />
        );
    }

    function renderContent() {
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    paddingTop: 34,
                    paddingHorizontal: 20,
                    flexGrow: 1,
                }}
            >
                <Text
                    style={{
                        marginBottom: 20,
                        ...FONTS.BodyText,
                        color: COLORS.lightBlack,
                    }}
                >
                    Enter new password and confirm.
                </Text>
                <InputField
                    title="New Password"
                    placeholder="••••••••"
                    contaynerStyle={{ marginBottom: 10 }}
                    icon={
                        <TouchableOpacity>
                            <EyeOff />
                        </TouchableOpacity>
                    }
                />
                <InputField
                    title="Confirm Password"
                    placeholder="••••••••"
                    contaynerStyle={{ marginBottom: 20 }}
                    icon={
                        <TouchableOpacity>
                            <EyeOff />
                        </TouchableOpacity>
                    }
                />
                <Button
                    title="change password"
                    onPress={() =>
                        navigation.navigate("YourPasswordHasBeenReset")
                    }
                />
            </KeyboardAwareScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AndroidSafeArea.AndroidSafeArea }}>
            {renderBackground()}
            {renderHeader()}
            {renderContent()}
        </SafeAreaView>
    );
}
