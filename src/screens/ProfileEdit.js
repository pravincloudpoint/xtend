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
import { useNavigation, useRoute } from "@react-navigation/native";

import {
  Header,
  Button,
  ProfileEditCategoryComponent,
  InputField,
} from "../components";
import { AREA, COLORS, SIZES } from "../constants";
import { Camera } from "../svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileEdit() {
  const navigation = useNavigation();
  const route = useRoute();
  const {data } = route.params;
  console.log("🚀 ~ file: ProfileEdit.js:27 ~ data:", data);

  function renderHeader() {
    return (
      <Header
        title="View Profile"
        goBack={true}
        onPress={() => navigation.goBack(null)}
      />
    );
  }

  function renderContent() {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={{ marginBottom: 10, marginTop: 20 }}>
          <ImageBackground
            // source={{ uri: "https://via.placeholder.com/360x360" }}
            source={require("../assets/images/user.png")}
            style={{
              width: 120,
              height: 120,
              alignSelf: "center",
              marginTop: 20,
              marginBottom: 20,
            }}
            imageStyle={{ borderRadius: 60 }}
          >
            {/* <View
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
            </View> */}
          </ImageBackground>
        </TouchableOpacity>
        {/* <ProfileEditCategoryComponent
          title="Name"
          // placeholder="Kristin Watson"
          placeholder={data ? data.username : "Xtend"}
          contaynerStyle={{ marginBottom: 5, width: "100%" }}
        />
        <ProfileEditCategoryComponent
          title="Email"
          //placeholder="kristinwatson@mail.com"
          placeholder={data ? data.email : "Xtend@mail.com"}
          contaynerStyle={{ marginBottom: 5, width: "100%" }}
        />
        <ProfileEditCategoryComponent
          title="Phone number"
          placeholder={data ? data.phoneNumber : "+91 123456789"}
          contaynerStyle={{ marginBottom: 5, width: "100%" }}
        />
        <ProfileEditCategoryComponent
          title="Location"
          placeholder="India"
          contaynerStyle={{ marginBottom: 5, width: "100%" }}
        /> */}
      
        <InputField
          title="Name"
          placeholder={data ? data.username : ""}
          contaynerStyle={{
            marginBottom: 10,
          }}
          value={data ? data.username : ""}
          selectTextOnFocus={false}
          editable={false}
        />
        
        <InputField
          title="Email"
          placeholder={data ? data.email : ""}
          contaynerStyle={{
            marginBottom: 10,
          }}
          value={data ? data.username : ""}
          selectTextOnFocus={false}
          editable={false}
        />
           <InputField
          title="Phone number"
          placeholder={data ? data.phoneNumber : ""}
          contaynerStyle={{
            marginBottom: 10,
          }}
          selectTextOnFocus={false}
          editable={false}
        />
        <InputField
          title="State"
          placeholder={ data.location.region? data.location.region : ""}
          contaynerStyle={{
            marginBottom: 10,
          }}
          selectTextOnFocus={false}
          editable={false}
        />
        <InputField
          title="City"
          placeholder={ data.location.city? data.location.city : ""}
          contaynerStyle={{
            marginBottom: 10,
          }}
          selectTextOnFocus={false}
          editable={false}
        />
         <InputField
          title="School Name"
          placeholder={ data.schoolName? data.schoolName : ""}
          contaynerStyle={{
            marginBottom: 10,
          }}
          selectTextOnFocus={false}
          editable={false}
        />
         <InputField
          title="Class"
          placeholder={ data.class? data.class : ""}
          contaynerStyle={{
            marginBottom: 10,
          }}
          selectTextOnFocus={false}
          editable={false}
        />
        
        {/* <Button
          title="Save changes"
          containerStyle={{ marginTop: 10 }}
          onPress={() => navigation.navigate("MyProfile")}
        /> */}
     
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, ...AREA.AndroidSafeArea }}>
    <View style={{ flex: 1 }}>
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
    </View>
    </SafeAreaView>
  );
}
