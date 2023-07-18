import { SafeAreaView, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Header, WishListComponent } from "../components";
import { AndroidSafeArea, SIZES, courses } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

export default function MyWishlist() {
  const navigation = useNavigation();
  const myFavorite = useSelector((state) => state.favorite);
  console.log("🚀 ~ MyWishlist ~ myFavorite:", myFavorite);

  useEffect(() => {
    //  getWishlist()
  }, []);
  function renderHeader() {
    return <Header title="My Wishlist" onPress={() => navigation.goBack(null)} />;
  }

  function renderBackground() {
    return (
      <Image
        source={require("../assets/images/background/background-01.png")}
        style={{
          position: "absolute",
          width: SIZES.width,
          height: SIZES.height,
          resizeMode: "stretch",
        }}
      />
    );
  }

  function renderContent() {
    return (
      <FlatList
        data={myFavorite}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
        renderItem={({ item, index }) => {
          return <WishListComponent item={item} />;
        }}
      />
    );
  }

  return (
    <SafeAreaView style={{ ...AndroidSafeArea.AndroidSafeArea}}>
      {renderBackground()}
      {renderHeader()}
      {renderContent()}
    </SafeAreaView>
  );
}
