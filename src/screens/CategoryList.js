import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Header, CardComponent } from "../components";
import { AndroidSafeArea, courses } from "../constants";

export default function CategoryList({ route }) {
  console.log("==================route==================", route.params);
  const { item, className } = route.params;
  console.log("==================id==================", item);
  const navigation = useNavigation();

  const popular = courses.filter(function (course) {
    return course.category == item.name && course.class == className.class;
  });
  console.log("popular", popular);
  function renderHeader() {
    return (
      <Header
        title={item.name}
        goBack={true}
        filter={true}
        onPress={() => navigation.goBack()}
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
        {popular.map((item, index, array) => {
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
