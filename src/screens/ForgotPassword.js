import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { Header, InputField, Button } from "../components";
import { AREA, COLORS, FONTS, SIZES } from "../constants";

export default function ForgotPassword() {
    const navigation = useNavigation();

    function renderHeader() {
        return (
            <Header
                title="Forgot password"
                onPress={() => navigation.goBack()}
            />
        );
    }

    function renderContent() {
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    paddingTop: 30,
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
                    Please enter your email address. You will receive a link to
                    create a new password via email.
                </Text>
                <InputField
                    title="Email"
                    placeholder="kristinwatson@mail.com"
                    contaynerStyle={{ marginBottom: 20 }}
                />
                <Button
                    title="Send"
                    onPress={() => navigation.navigate("ResetPassword")}
                />
            </KeyboardAwareScrollView>
        );
    }

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

    return (
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            {renderBackground()}
            {renderHeader()}
            {renderContent()}
        </SafeAreaView>
    );
}
