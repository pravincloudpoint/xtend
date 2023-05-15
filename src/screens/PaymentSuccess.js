import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { AndroidSafeArea, COLORS, FONTS, SIZES } from "../constants";
import { Button } from "../components";

export default function PaymentSuccess() {
    const navigation = useNavigation();

    function renderBackground() {
        return (
            <Image
                source={require("../assets/images/background/background-03.png")}
                style={{
                    position: "absolute",
                    width: SIZES.width,
                    height: SIZES.height,
                    resizeMode: "stretch",
                }}
            />
        );
    }

    function renderContent() {
        return (
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 40,
                    paddingTop: SIZES.height * 0.1,
                }}
                showsVerticalScrollIndicator={false}
            >
                <Image
                    source={require("../assets/images/logo/logo.png")}
                    style={{
                        width: 50,
                        height: 50,
                        alignSelf: "center",
                        marginBottom: 10,
                    }}
                />
                <Text
                    style={{
                        textAlign: "center",
                        ...FONTS.Spartan_600SemiBold,
                        fontSize: 12,
                        color: COLORS.mainColor,
                        marginBottom: 22,
                    }}
                >
                    Nuton
                </Text>
                <Image
                    source={{ uri: "https://via.placeholder.com/552x552" }}
                    style={{
                        width: 184,
                        height: 184,
                        alignSelf: "center",
                        marginBottom: 23,
                    }}
                />
                <Text
                    style={{
                        ...FONTS.H2,
                        color: COLORS.mainColor,
                        textAlign: "center",
                        lineHeight: FONTS.H2.fontSize * 1.4,
                        marginBottom: 10,
                    }}
                >
                    Congratulations!
                </Text>
                <Text
                    style={{
                        textAlign: "center",
                        ...FONTS.BodyText,
                        marginBottom: 24,
                        lineHeight: FONTS.BodyText.fontSize * 1.7,
                    }}
                >
                    Your payment is successful! {"\n"} Thank you!
                </Text>
                <Button
                    title="Continue"
                    onPress={() => navigation.navigate("MainLayout")}
                />
            </ScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AndroidSafeArea.AndroidSafeArea }}>
            {renderBackground()}
            {renderContent()}
        </SafeAreaView>
    );
}
