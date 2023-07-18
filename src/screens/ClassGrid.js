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
  const { className,courses } = route.params;
  // console.log("🚀 ~ ClassGrid ~ courses:", courses);
  // console.log("🚀 ~ ClassGrid ~ className:", className);

  return (
    <SafeAreaView
      style={{ marginBottom: 10, flex: 1, ...AndroidSafeArea.AndroidSafeArea }}
    >
      <Header title="Classes" goBack={true} onPress={() => navigation.goBack(null)}/>
      <FlatList
        data={className}
        horizontal={false}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
        renderItem={({ item, index }) => {
          console.log("item", item);
          return (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate("CategoryGrid", {
                  className: item,
                  courses
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
                source={item.image}
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
                  {item.class}
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
