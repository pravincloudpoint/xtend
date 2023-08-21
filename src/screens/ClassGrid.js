import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import React from "react";
import { AndroidSafeArea, COLORS, FONTS, categories } from "../constants";
import { CategoryComponent, Header } from "../components";
import { useNavigation } from "@react-navigation/native";

export default function ClassGrid({ route }) {
  const navigation = useNavigation();
  const { className, board, language } = route.params;
  console.log("🚀 ~ file: ClassGrid.js:17 ~ className:", className);
  console.log("🚀 ~ file: ClassGrid.js:17 ~ language:", language);
  // console.log("🚀 ~ file: ClassGrid.js:17 ~ classList:", classList);
//  console.log("🚀 ~ ClassGrid ~ courses:", courses);
  //  console.log("🚀 ~ ClassGrid ~ className:", className);

  //  console.log("🚀 ~ file: ClassGrid.js:17 ~ courses:", courses);
  const data = board.filter(function (item) {
    return item.language == language;
  });
  console.log("🚀 ~ file: ClassGrid.js:27 ~ data:", data);
  
  const unique = [...new Set(data.map((item) => item.class))]; // [ 'A', 'B']
  // console.log("🚀 ~ Home ~ unique:", unique);

  const classList = unique.filter((d) => d.includes("Class"));


   function compareClasses(classObj1, classObj2) {
    const classNumber1 = parseInt(classObj1.split(' ')[1]);
    const classNumber2 = parseInt(classObj2.split(' ')[1]);
    return classNumber1 - classNumber2;
  }
  classList.sort(compareClasses);
  console.log("🚀 ~ file: ClassGrid.js:33 ~ classList:", classList);

  // console.log("🚀 ~ file: Home.js:101 ~ classList:", classList);
  // console.log("🚀 ~ file: Home.js:101 ~ classList:", classList);
  // let classes = [
  //   ...new Set(
  //     courses.filter((t) => t.language == language)
  //   ),
  // ];
  // console.log("🚀 ~ file: ClassGrid.js:31 ~ classes:", classes);

  // function compareClasses(classObj1, classObj2) {
  //   const classNumber1 = parseInt(classObj1.split(' ')[1]);
  //   const classNumber2 = parseInt(classObj2.split(' ')[1]);
  //   return classNumber1 - classNumber2;
  // }
  // classes.sort(compareClasses);
  // console.log("🚀 ~ file: Home.js:101 ~ classList:", classes);

  // console.log("🚀 ~ file: ClassGrid.js:17 ~ courses:", courses);

  return (
    <SafeAreaView
      style={{ marginBottom: 10, flex: 1, ...AndroidSafeArea.AndroidSafeArea }}
    >
      <Header title="Classes" goBack={true} onPress={() => navigation.goBack(null)}/>
      <FlatList
        data={classList}
        horizontal={false}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate("CategoryGrid", {
                  className: item,
                  data
                })
              }
              style={{
                paddingHorizontal: 8,
                borderWidth: 1,
                borderColor: COLORS.gray,
                borderRadius: 5,
                marginBottom: 10,
                height: 120,
                width: 160,
                justifyContent: "space-around",
                alignItems: "center",
                // backgroundColor:COLORS.green
              }}
            >
              <ImageBackground
                // style={{
                //   paddingHorizontal: 20,
                //   paddingTop: 8,
                //   height: 89,
                //   width: 175,
                //   marginRight: 10,
                //   marginLeft: -10,
                //   marginVertical: 8,
                // }}
                style={{
                    height: 50,
                    width: 50,
                    marginRight: 10,
                    marginLeft: -20,
                    marginVertical: 8,
                    padding:10,
                    marginBottom:20
                  }}
                source={require("../assets/subjects/webinar.png")}
                imageStyle={{ borderRadius: 10, height: 80, width: 80 }}
              >

              </ImageBackground>
              <Text
                  style={{
                    ...FONTS.Lato_700Bold,
                    color: COLORS.black,
                    lineHeight: 14 * 1.5,
                    fontSize: 14,
                  }}
                >
                  {item}
                </Text>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={{ padding: 10 }}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
