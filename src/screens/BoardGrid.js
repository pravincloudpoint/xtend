import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Header, InputField, Button, CategoryComponent } from "../components";
import { AndroidSafeArea, COLORS, FONTS, SIZES } from "../constants";
import { Camera } from "../svg";
import { FlatList } from "react-native-gesture-handler";
import { classes } from "../constants/constants";

export default function BoardGrid() {
  const navigation = useNavigation();
  const route = useRoute();
  const { boardName,board } = route.params;
  // console.log("🚀 ~ BoardGrid ~ board:", board);
  // console.log("🚀 ~ BoardGrid ~ className:", boardName);
  function renderClasses() {
    return (
      <SafeAreaView>
        <Header
          title="Board List"
          goBack={true}
          onPress={() => navigation.goBack(null)}
        />
        <FlatList
          data={boardName}
          horizontal={false}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
          renderItem={({ item, index }) => {
            // console.log("item", item);
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("BoardCategoryGrid", {
                    title: item,
                    board: board
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
                  source={require("../assets/images/categories/digital-marketing.png")}
                  imageStyle={{ borderRadius: 10 }}
                >
                  <Text
                    style={{
                      ...FONTS.Lato_700Bold,
                      color: COLORS.white,
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
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{ marginBottom: 10, flex: 1, ...AndroidSafeArea.AndroidSafeArea }}
    >
      {renderClasses()}
    </SafeAreaView>
  );
}
