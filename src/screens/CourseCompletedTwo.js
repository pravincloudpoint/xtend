import {
    Text,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import React from "react";

import { Header, Button } from "../components";
import { AndroidSafeArea, COLORS, FONTS, SIZES } from "../constants";

export default function CourseCompletedTwo({ navigation }) {
    function renderHeader() {
        return <Header leftIcon="back" onPress={() => navigation.goBack()} />;
    }

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
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                    paddingTop: SIZES.height * 0.1,
                }}
                showsVerticalScrollIndicator={false}
            >
                <Image
                    source={{ uri: "https://via.placeholder.com/600x600" }}
                    style={{
                        width: 200,
                        height: 200,
                        marginBottom: 15,
                        alignSelf: "center",
                    }}
                />
                <Text
                    style={{
                        ...FONTS.H2,
                        textAlign: "center",
                        lineHeight: FONTS.H2.fontSize * 1.4,
                        marginBottom: 10,
                        color: COLORS.mainColor,
                    }}
                >
                    Congratulations!
                </Text>
                <Text
                    style={{
                        textAlign: "center",
                        ...FONTS.BodyText,
                        color: COLORS.bodyTextColor,
                        marginBottom: 24,
                    }}
                >
                    You have received a course completion {"\n"} certificate.
                </Text>
                <Button
                    title="Download certificate"
                    containerStyle={{ marginBottom: 20 }}
                />
                <TouchableOpacity>
                    <Text
                        style={{
                            textAlign: "center",
                            ...FONTS.Spartan_500Medium,
                            fontSize: 14,
                            textTransform: "capitalize",
                            lineHeight: 14 * 1.7,
                        }}
                    >
                        leave a feedback
                    </Text>
                </TouchableOpacity>
            </ScrollView>
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
