import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Header, Button, ProfileEditCategoryComponent } from "../components";
import { AREA, COLORS, SIZES } from "../constants";
import { Camera } from "../svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileEdit() {
  const navigation = useNavigation();

  const [data, setData] = useState("");
  console.log("🚀 ~ MyProfile ~ data:", data);

  const checkUserLogin = async () => {
    console.log("🚀 ~ checkUserLogin ~ checkUserLogin:", checkUserLogin);
    await AsyncStorage.getItem("data")
      .then((jsonValue) => {
        const d = jsonValue != null ? JSON.parse(jsonValue) : null;
        console.log("🚀 ~ .then ~ d:", d);
        setData(d);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    checkUserLogin();
  }, []);

  function renderHeader() {
    return (
      <Header
        title="Profile Edit"
        goBack={true}
        onPress={() => navigation.goBack()}
      />
    );
  }

  function renderContent() {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={{ marginBottom: 45, marginTop: 20 }}>
          <ImageBackground
            source={{ uri: "https://via.placeholder.com/360x360" }}
            style={{
              width: 120,
              height: 120,
              alignSelf: "center",
              marginTop: 20,
              marginBottom: 20,
            }}
            imageStyle={{ borderRadius: 60 }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: COLORS.white,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                right: 0,
                bottom: -10,
              }}
            >
              <Camera />
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <ProfileEditCategoryComponent
          title="Name"
          // placeholder="Kristin Watson"
          placeholder= {data? data.username : "Xtend" }
          contaynerStyle={{ marginBottom: 5 ,width:"100%"}}
        />
        <ProfileEditCategoryComponent
          title="Email"
          //placeholder="kristinwatson@mail.com"
          placeholder= {data? data.email : "Xtend@mail.com" }
          contaynerStyle={{ marginBottom: 5 ,width:"100%"}}
        />
        <ProfileEditCategoryComponent
          title="Phone number"
          placeholder={data? data.phoneNumber : "+91 123456789" }
          contaynerStyle={{ marginBottom: 5 ,width:"100%"}}
        />
        <ProfileEditCategoryComponent
          title="Location"
          placeholder="India"
          contaynerStyle={{ marginBottom: 5 ,width:"100%"}}
        />
        <Button
          title="Save changes"
          containerStyle={{ marginTop: 10 }}
          onPress={() => navigation.navigate("MyProfile")}
        />
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, ...AREA.AndroidSafeArea }}>
      <Image
        source={require("../assets/images/background/background-01.png")}
        style={{
          position: "absolute",
          width: SIZES.width,
          height: SIZES.height,
          resizeMode: "stretch",
        }}
      />
      {renderHeader()}
      {renderContent()}
    </SafeAreaView>
  );
}
