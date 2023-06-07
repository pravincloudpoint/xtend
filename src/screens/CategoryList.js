import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Header, CardComponent } from "../components";
import { AndroidSafeArea, courses } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchOtt } from "../Slice/OttSlice";

export default function CategoryList({ route }) {
  console.log("🚀 ~ CategoryList ~ CategoryList:", CategoryList);
  console.log("==================route==================", route.params);
  const { item, className } = route.params;
  console.log("==================id==================", item);
  const navigation = useNavigation();


  const [data, setData] = useState();
  console.log("🚀 ~ Home ~ data:", data);

  const dispatch = useDispatch();
  const video = useSelector((state) => state);

  const getData = async () => {
    const videos = await video;
    setData(videos.video.data);
  };
 

  useEffect(() => {
    dispatch(fetchOtt());
    getData();
  }, []);
  const popular = courses.filter(function (course) {
    console.log('====================================',course.category);
    console.log('====================================',item.name );
    console.log('====================================',course.class);
    console.log('====================================',className.class);
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
      { data && renderContent()}
    </SafeAreaView>
  );
}
