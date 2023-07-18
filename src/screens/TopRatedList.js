import { View, SafeAreaView, Text, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Header, CardComponent, CategoryComponent } from "../components";
import { AndroidSafeArea, COLORS, FONTS, courses } from "../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function TopRatedList({ route }) {
  const navigation = useNavigation();
  // console.log("==================route==================", route.params);
  const {
    topRated,
    popular,
    name,
    speciallyForYou,
    isNew,
    skill,
    kids,
    education,
    listSection
  } = route.params;
  console.log(name, "name");

  if (topRated) {
    var data = topRated;
  }
  if (popular) {
    var data = popular;
  }
  if (speciallyForYou) {
    var data = speciallyForYou;
  }
  if (isNew) {
    var data = isNew;
  }
  if (skill) {
    var data = skill;
  }
  if (kids) {
    var data = kids;
  }
  if (education) {
    var data = education;
  }
  function renderTopRated() {
    return (
      <View style={{ marginBottom: 30  }}>
        <Header title={name} goBack={true}  onPress={() => navigation.goBack(null)}   />

        {listSection.map((item, index, array) => {
          const lastIndex = array.length - 1;
          return (
            <View
              key={index}
              style={{
                marginHorizontal: 20,
              }}
            >
              <CardComponent
                item={item}
                lastComponent={index == lastIndex ? true : false}
                onPress={() =>
                  navigation.navigate("CourseDetails", {
                    item: item,
                  })
                }
              />
            </View>
          );
        })}
        {listSection.length == 0  &&
          Alert.alert(
            "Alert",
            "Please connect to Satellite Receiver to view content",
            [
              {
                text: "Cancel",
                onPress: () => navigation.navigate("MainLayout"),
                style: "cancel",
              },
              { text: "OK", onPress: () => navigation.navigate("OnBoarding") },
            ]
          )}
      </View>
    );
  }
  return (
    <KeyboardAwareScrollView
      style={{
        marginBottom: 10,
        flexGrow: 1,
        ...AndroidSafeArea.AndroidSafeArea,
      }}
    >
      {renderTopRated()}
    </KeyboardAwareScrollView>
  );
}
