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

export default function CategoryGrid() {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{ marginBottom: 30, flex: 1, ...AndroidSafeArea.AndroidSafeArea }}
    >
      <Header title="Subjects" goBack={false} />
      <FlatList
        data={categories}
        horizontal={false}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
        renderItem={({ item, index }) => {
          console.log("item", item);
          return (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate("CategoryList", {
                  item,
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
                source={item.image}
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
                  {item.name}
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
