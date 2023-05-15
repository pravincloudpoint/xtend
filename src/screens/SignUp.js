import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Header, InputField, Button } from "../components";
import { AndroidSafeArea, SIZES, FONTS, COLORS } from "../constants";
import { Check, Facebook, Google, Twitter, EyeOff } from "../svg";

export default function SignUp({ navigation }) {
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
        return <Header title="Sign Up" onPress={() => navigation.goBack()} />;
    }

    function renderContent() {
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    paddingTop: 36,
                    paddingHorizontal: 20,
                    flexGrow: 1,
                    paddingBottom: 25,
                }}
            >
                <Image
                    source={require("../assets/images/other/logo.png")}
                    style={{
                        width: 30,
                        height: 30,
                        alignSelf: "center",
                        marginBottom: 20,
                    }}
                />
                <Text
                    style={{
                        textAlign: "center",
                        ...FONTS.H1,
                        marginBottom: 30,
                        lineHeight: 32 * 1.2,
                        color: COLORS.black,
                    }}
                >
                    Sign up
                </Text>
                <InputField
                    title="Name"
                    placeholder="Kristin Watson"
                    icon={
                        <View style={{ padding: 20 }}>
                            <Check />
                        </View>
                    }
                    contaynerStyle={{ marginBottom: 10 }}
                />
                <InputField
                    title="Email"
                    placeholder="kristinwatson@mail.com"
                    icon={
                        <View style={{ padding: 20 }}>
                            <Check />
                        </View>
                    }
                    contaynerStyle={{ marginBottom: 10 }}
                />
                <InputField
                    title="Password"
                    placeholder="••••••••"
                    icon={
                        <TouchableOpacity style={{ padding: 20 }}>
                            <EyeOff />
                        </TouchableOpacity>
                    }
                    contaynerStyle={{ marginBottom: 10 }}
                />
                <InputField
                    title="Confirm Password"
                    placeholder="••••••••"
                    icon={
                        <TouchableOpacity style={{ padding: 20 }}>
                            <EyeOff />
                        </TouchableOpacity>
                    }
                    contaynerStyle={{ marginBottom: 35 }}
                />
                <Button
                    title="sign up"
                    containerStyle={{ marginBottom: 20 }}
                    onPress={() => navigation.navigate("VerifyYourPhoneNumber")}
                />
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 38,
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.Lato_400Regular,
                            fontSize: 16,
                            color: COLORS.lightBlack,
                            lineHeight: 16 * 1.7,
                        }}
                    >
                        Already have an account?
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SignIn")}
                    >
                        <Text
                            style={{
                                ...FONTS.Lato_700Bold,
                                fontSize: 16,
                                color: COLORS.black,
                                lineHeight: 16 * 1.7,
                            }}
                        >
                            {" "}
                            Sign in.
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <TouchableOpacity>
                        <Facebook />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Twitter />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Google />
                    </TouchableOpacity>
                </View>
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
