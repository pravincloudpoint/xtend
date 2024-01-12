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
import { AndroidSafeArea, COLORS, FONTS, categories } from "../constants";
import { CategoryComponent, Header } from "../components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { classes } from "../constants/constants";

export default function BoardCategoryGrid() {
  const navigation = useNavigation();
  const useRouteList = useRoute();
  const { board, title } = useRouteList.params;
  // console.log("🚀 ~ file: BoardCategoryGrid.js:20 ~ board:", board);
  // console.log("🚀 ~ BoardCategoryGrid ~ title:", title);

  let languageList = [
    ...new Set(
      board.filter((t) => t.board == title).map((item) => item.language)
    ),
  ];
  let classes = [
    ...new Set(
      board.filter((t) => t.board == title).map((item) => item.class)
    ),
  ];
  // console.log("🚀 ~ file: BoardCategoryGrid.js:33 ~ classes:", classes);
  


  // console.log("🚀 ~ BoardCategoryGrid ~ categoryList:", categoryList);
  //  const uniqueLang = [...new Set(categoryList.map(item => item.language))];
  //  console.log("🚀 ~ BoardCategoryGrid ~ uniqueLang:", uniqueLang);
  return (
    <SafeAreaView
      style={{ marginBottom: 30, flex: 1, ...AndroidSafeArea.AndroidSafeArea }}
    >
      <Header title={title} goBack={true} onPress={() => navigation.goBack(null)}  />
      <FlatList
        data={languageList}
        horizontal={false}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate("ClassGrid", {
                  className: classes,
                  board:  board,
                  language:item
                })
              }
            >
              <ImageBackground
                style={{
                  paddingHorizontal: 20,
                  paddingTop: 8,
                  height: 89,
                  width: 175,
                  marginRight: 10,
                  marginLeft: -10,
                  marginVertical: 8,
                }}
                source={require("../assets/images/categories/business.png")}
                imageStyle={{ borderRadius: 10 }}
              >
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
              </ImageBackground>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={{ paddingLeft: 20 }}
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
