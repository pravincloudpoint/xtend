import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Header, CardComponent } from "../components";
import { AndroidSafeArea, courses } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchOtt } from "../Slice/OttSlice";

export default function CategoryList({ route }) {
  const { item, className ,subjectList} = route.params;
  // console.log("🚀 ~ subjectList ~ subjectList: ===============>", subjectList);
  //  console.log("==================item==================", item.subject);
  const navigation = useNavigation();

  const chapters = subjectList.filter(function (course) {
    return course.subject === item.subject;
  });
  // console.log("chapters=========================>",  chapters);
  function renderHeader() {
    return (
      <Header
        title={item.subject}
        goBack={true}
        filter={true}
        onPress={() => navigation.goBack(null)}
        filterOnPress={() => navigation.navigate("Filter")}
      />
    );
  }

  function renderContent() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 10,
          paddingBottom: 25,
        }}
        showsVerticalScrollIndicator={false}
      >
        {chapters?.map((item, index, array) => {
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
                // onPress={() =>
                //   navigation.navigate("CourseDetailsTwo", {
                //     item: item,
                //   })
                // }
                onPress={() =>
                  navigation.navigate("CourseDetails", {
                    item: item,
                  })
                }
              />
            </View>
          );
        })} 
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={{ ...AndroidSafeArea.AndroidSafeArea }}>
      {renderHeader()}
      {renderContent()}
    </SafeAreaView>
  );
}
