import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";

import { COLORS, FONTS } from "../constants";
import {
    InstructorStar,
    InstructorChat,
    InstructorUser,
    InstructorPlay,
    ShowMore,
} from "../svg";

export default function InstructorSectionComponent({ item }) {
    // console.log("🚀 ~ file: InstructorSectionComponent.js:14 ~ item:", item);
    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingVertical: 20 }}
            showsVerticalScrollIndicator={false}
        >
            <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
                <Text
                    style={{
                        ...FONTS.H5,
                        marginBottom: 2,
                        lineHeight: 16 * 1.5,
                        textTransform: "capitalize",
                    }}
                >
                    {item.name}
                </Text>
                <Text
                    style={{
                        ...FONTS.H5,
                        marginBottom: 2,
                        lineHeight: 16 * 1.5,
                        textTransform: "capitalize",
                    }}
                >
                    {item.id}
                </Text>
                <Text
                    style={{
                        ...FONTS.Lato_400Regular,
                        fontSize: 10,
                        color: COLORS.secondaryTextColor,
                        lineHeight: 10 * 1.7,
                        marginBottom: 10,
                    }}
                >
                    {item.duration}
                </Text>
                {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                        source={item.instructorPhoto}
                        style={{
                            width: 91,
                            height: 91,
                            borderRadius: 5,
                            marginRight: 10,
                        }}
                    />
                    <View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: 6,
                            }}
                        >
                            <InstructorStar />
                            <Text
                                style={{
                                    marginLeft: 10,
                                    ...FONTS.Lato_400Regular,
                                    fontSize: 10,
                                    color: COLORS.bodyTextColor,
                                    lineHeight: 10 * 1.7,
                                }}
                            >
                                {item.instructorRating} Instructor Rating
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: 6,
                            }}
                        >
                            <InstructorChat />
                            <Text
                                style={{
                                    marginLeft: 10,
                                    ...FONTS.Lato_400Regular,
                                    fontSize: 10,
                                    color: COLORS.bodyTextColor,
                                    lineHeight: 10 * 1.7,
                                }}
                            >
                                {item.instructorReviews} Reviews
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: 6,
                            }}
                        >
                            <InstructorUser />
                            <Text
                                style={{
                                    marginLeft: 10,
                                    ...FONTS.Lato_400Regular,
                                    fontSize: 10,
                                    color: COLORS.bodyTextColor,
                                    lineHeight: 10 * 1.7,
                                }}
                            >
                                {item.instructorStudents} Students
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <InstructorPlay />
                            <Text
                                style={{
                                    marginLeft: 10,
                                    ...FONTS.Lato_400Regular,
                                    fontSize: 10,
                                    color: COLORS.bodyTextColor,
                                    lineHeight: 10 * 1.7,
                                }}
                            >
                                {item.instructorCourses} Courses
                            </Text>
                        </View>
                    </View>
                </View> */}
            </View>
            <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
                <Text
                    style={{
                        ...FONTS.H5,
                        marginBottom: 2,
                        lineHeight: 16 * 1.5,
                        textTransform: "capitalize",
                    }}
                >
                    About
                </Text>
                <Text
                    style={{
                        ...FONTS.BodyText,
                        color: COLORS.bodyTextColor,
                        marginBottom: 10,
                    }}
                >
                    {item.about}
                </Text>
                {/* <TouchableOpacity>
                    <ShowMore />
                </TouchableOpacity> */}
            </View>
            {/* <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
                <Text
                    style={{
                        ...FONTS.H5,
                        marginBottom: 2,
                        lineHeight: 16 * 1.5,
                        textTransform: "capitalize",
                    }}
                >
                    Student feedback
                </Text>
            </View> */}
        </ScrollView>
    );
}
