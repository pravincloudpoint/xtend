import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Alert,
} from "react-native";
import React from "react";
import {
  AndroidSafeArea,
  COLORS,
  FONTS,
  SIZES,
  categories,
} from "../constants";
import * as All from "../assets/subjects";
import { CategoryComponent, Header } from "../components";
import { useNavigation } from "@react-navigation/native";

export default function CategoryGrid({ route }) {
  const navigation = useNavigation();
  const { className, courses } = route.params;
  // console.log("🚀 ~ CategoryGrid ~ data:",  courses);
  // console.log("🚀 ~ CategoryGrid ~ className:", className.class);

  let categoryList = courses.filter((t) => t.class == className.class);
   console.log("CategoryList",categoryList);

  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  const newCategoryList = getUniqueListBy(categoryList, "category");
  console.log("🚀 ~ CategoryGrid ~ newCategoryList:", newCategoryList);
  // console.log("-------",JSON.stringify(newCategoryList))
  console.log("=================================================>");
const constImage=require("../assets/subjects/e-learning.png");
  return (
    <SafeAreaView
      style={{ marginBottom: 30, flex: 1, ...AndroidSafeArea.AndroidSafeArea }}
    >
      <Header
        title="Subjects"
        goBack={true}
        onPress={() => navigation.goBack(null)}
      />
      <FlatList
        data={newCategoryList}
        horizontal={false}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "center",
        }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{
                paddingHorizontal: 8,
                borderWidth: 1,
                borderColor: COLORS.gray,
                 borderRadius: 5,
                marginBottom: 10,
                height: 140,
                width: 180,
                justifyContent: "space-around",
                alignItems: "center",
                backgroundColor:COLORS.lightBlue
              }}
              onPress={() =>
                  navigation.navigate("CategoryList", {
                    item,
                    className,
                    categoryList,
                  })
                }
            >
                <ImageBackground
                  style={{
                    height: 50,
                    width: 50,
                    marginRight: 10,
                    marginLeft: -10,
                    // marginVertical: 8,
                    padding:10,
                    marginBottom:20
                  }}
                  source={All[`${item.category}`] ? All[`${item.category}`]: constImage}
                  imageStyle={{ borderRadius: 10, height: 80, width: 80 }}
                ></ImageBackground>
              <Text
                style={{
                  ...FONTS.Lato_700Bold,
                  color: COLORS.black,
                  lineHeight: 14 * 1.5,
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                {item.category}
              </Text>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={{ padding: 10  }}
        showsHorizontalScrollIndicator={false}
      />
      {/* {newCategoryList.length == 0  &&
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
          )} */}
    </SafeAreaView>
  );
}
