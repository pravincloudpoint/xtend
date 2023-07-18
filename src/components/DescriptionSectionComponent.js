import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { FONTS, COLORS, SIZES } from "../constants";
import Button from "./Button";
import { TopRatedCheck, Video, Download, Certificate } from "../svg";

const topRated = [
  {
    id: "1",
    description: "Develop Immersive VR Experiences.",
  },
  {
    id: "2",
    description: "Create Distance Grab Mechanics.",
  },
  {
    id: "3",
    description:
      "Build Once, and deploy to both Steam VR, as well as Oculus, 6 DOF devices.",
  },
  {
    id: "4",
    description:
      "Build an entire VR Framework, from scratch, with Zero coding.",
  },
  {
    id: "5",
    description:
      "Create advanced Spatial UI, that you can interact with physically, using your hands, as well as using a pointer.",
  },
  {
    id: "6",
    description:
      "Learn to Outline Objects, using a Shader material, when an object is touched.",
  },
  {
    id: "7",
    description: "Create 2D UI, that you can interact with using a pointer.",
  },
  {
    id: "8",
    description: "Create Spatial Tooltips that can follow any object about.",
  },
];

export default function DescriptionSectionComponent({ item }) {
  console.log("🚀 ~ DescriptionSectionComponent ~ item:", item);
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          flexGrow: 1,
          paddingTop: 20,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            ...FONTS.H5,
            textTransform: "capitalize",
            color: COLORS.mainColor,
            marginBottom: 10,
            lineHeight: 16 * 1.5,
          }}
        >
          About
        </Text>
        <Text
          style={{
            ...FONTS.BodyText,
            color: COLORS.bodyTextColor,
            marginBottom: 1,
          }}
        >
          {item.about}
        </Text>
        <Text
          style={{
            ...FONTS.H5,
            textTransform: "capitalize",
            color: COLORS.mainColor,
            marginBottom: 10,
            lineHeight: 16 * 1.5,
          }}
        >
          Duration
        </Text>
        <Text
          style={{
            ...FONTS.BodyText,
            color: COLORS.bodyTextColor,
            marginBottom: 1,
          }}
        >
          {item.duration}
        </Text>
        <Text
          style={{
            ...FONTS.H5,
            textTransform: "capitalize",
            color: COLORS.mainColor,
            marginBottom: 10,
            lineHeight: 16 * 1.5,
          }}
        >
          Board
        </Text>
        <Text
          style={{
            ...FONTS.BodyText,
            color: COLORS.bodyTextColor,
            marginBottom: 1,
          }}
        >
          {item.board}
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
          {item.Tag}
        </Text>
        <Text
          style={{
            ...FONTS.BodyText,
            color: COLORS.bodyTextColor,
            marginBottom: 10,
          }}
        >
          {item.description}
        </Text>
        <Text
          style={{
            ...FONTS.H5,
            textTransform: "capitalize",
            color: COLORS.mainColor,
            marginBottom: 10,
            lineHeight: 16 * 1.5,
          }}
        >
          New Additions
        </Text>
        <View style={{ marginBottom: 30 }}>
          {item.additions && item.additions.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  width: "100%",
                  flexDirection: "row",
                }}
              >
                <View style={{ bottom: -7 }}>
                  <TopRatedCheck />
                </View>
                <Text
                  style={{
                    ...FONTS.BodyText,
                    marginLeft: 10,
                    color: COLORS.bodyTextColor,
                  }}
                >
                  {item}
                </Text>
              </View>
            );
          })}
        </View>

        {/* <Text
          style={{
            ...FONTS.H5,
            textTransform: "capitalize",
            color: COLORS.mainColor,
            marginBottom: 10,
            lineHeight: 16 * 1.5,
          }}
        >
          This course includes
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <Video />
          <Text
            style={{
              marginLeft: 10,
              ...FONTS.BodyText,
              color: COLORS.bodyTextColor,
            }}
          >
            14 hours on-demand video
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <Download />
          <Text
            style={{
              marginLeft: 10,
              ...FONTS.BodyText,
              color: COLORS.bodyTextColor,
            }}
          >
            16 downloadable resources
          </Text>
        </View> */}
        {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Certificate />
          <Text
            style={{
              marginLeft: 10,
              ...FONTS.BodyText,
              color: COLORS.bodyTextColor,
            }}
          >
            Certificate of completion
          </Text>
        </View> */}
      </ScrollView>

      <Button
        title="Play lecture"
        containerStyle={{
          position: "absolute",
          bottom: 0,
          marginHorizontal: 20,
          marginBottom: 20,
          width: SIZES.width - 40,
        }}
        onPress={() => navigation.navigate("Player", { item: item })}
      />
    </View>
  );
}
