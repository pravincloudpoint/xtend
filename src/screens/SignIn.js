import {
    View,
    Text,
    ImageBackground,
    SafeAreaView,
    Image,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { Header, InputField, Button } from "../components";
import { AREA, COLORS, FONTS, SIZES } from "../constants";
import { Check, EyeOff, CheckSmall, Facebook, Twitter, Google } from "../svg";

export default function SignIn() {
    const [rememberMe, setRememberMe] = useState(true);
    const navigation = useNavigation();

    function renderBackground() {
        return (
            <Image
                source={require("../assets/images/background/background-01.png")}
                style={{
                    position: "absolute",
                    width: SIZES.width,
                    height: SIZES.height + SIZES.height / 2,
                    resizeMode: "stretch",
                }}
            />
        );
    }

    function renderHeader() {
        return <Header title="Sign In" onPress={() => navigation.goBack()} />;
    }

    function renderContent() {
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    paddingTop: 36,
                    paddingHorizontal: 20,
                    flexGrow: 1,
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
                        marginBottom: 14,
                        lineHeight: 32 * 1.2,
                        color: COLORS.black,
                    }}
                >
                    Welcome Back!
                </Text>
                <Text
                    style={{
                        textAlign: "center",
                        ...FONTS.Lato_Regular,
                        fontSize: 18,
                        color: COLORS.black,
                        lineHeight: 18 * 1.7,
                        marginBottom: 26,
                    }}
                >
                    Sign in to continue
                </Text>
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
                        <View style={{ padding: 20 }}>
                            <EyeOff />
                        </View>
                    }
                    contaynerStyle={{ marginBottom: 16 }}
                />
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 30,
                    }}
                >
                    <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center" }}
                        onPress={() => setRememberMe(!rememberMe)}
                    >
                        <View
                            style={{
                                width: 16,
                                height: 16,
                                borderWidth: 1,
                                borderRadius: 4,
                                marginRight: 8,
                                borderColor: COLORS.lightBlack,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {rememberMe && <CheckSmall />}
                        </View>
                        <Text>Remember me</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ForgotPassword")}
                    >
                        <Text
                            style={{
                                ...FONTS.Lato_700Bold,
                                fontSize: 16,
                                color: COLORS.black,
                            }}
                        >
                            Forgot password?
                        </Text>
                    </TouchableOpacity>
                </View>
                <Button
                    title="Sign in"
                    containerStyle={{ marginBottom: 20 }}
                    onPress={() => navigation.navigate("MainLayout")}
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
                        Don’t have an account?
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SignUp")}
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
                            Sign up.
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
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            {renderBackground()}
            {renderHeader()}
            {renderContent()}
        </SafeAreaView>
    );
}
