import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Home from "../screens/Home";
import Search from "../screens/Search";
import MyDownloads from "../screens/MyDownloads";
import MyProfile from "../screens/MyProfile";
import { UserTab, BookOpenTab, SearchTab, HomeTab, Download } from "../svg";
import { COLORS, FONTS } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchOtt } from "../Slice/OttSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MainLayout() {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("Home");
  useEffect(() => {
    setSelectedTab("Home")
  }, []);

  const tabs = [
    {
      id: "1",
      screen: "Home",
      icon: (
        <HomeTab
          strokeColor={
            selectedTab == "Home" ? COLORS.black : COLORS.secondaryTextColor
          }
        />
      ),
    },
    {
      id: "2",
      screen: "Search",
      icon: (
        <SearchTab
          strokeColor={
            selectedTab == "Search" ? COLORS.black : COLORS.secondaryTextColor
          }
        />
      ),
    },
    {
      id: "3",
      screen: "Downloads",
      // icon: (
      //   <Download
      //     strokeColor={
      //       selectedTab == "Downloads"
      //         ? COLORS.black
      //         : COLORS.secondaryTextColor
      //     }
      //   />
      // ),
      icon:
        selectedTab == "Downloads" ? (
          <Download strokeColor={COLORS.black} hight={28} width={23} color={COLORS.black}/>
        ) : (
          <Download strokeColor={COLORS.black} hight={28} width={23}  color={COLORS.secondaryTextColor}/>
        ),
    },
    {
      id: "4",
      screen: "My Profile",
      icon: (
        <UserTab
          strokeColor={
            selectedTab == "My Profile"
              ? COLORS.black
              : COLORS.secondaryTextColor
          }
        />
      ),
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {selectedTab == "Home" && <Home />}
      {selectedTab == "Search" && <Search />}
      {selectedTab == "Downloads" && <MyDownloads />}
      {selectedTab == "My Profile" && <MyProfile />}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 5,
          backgroundColor: COLORS.white,
          borderTopColor: "#EEEEEE",
          borderTopWidth: 1,
          paddingHorizontal: 30,
        }}
      >
        {tabs.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{ alignItems: "center" }}
              onPress={() => setSelectedTab(item.screen)}
            >
              <View style={{ marginBottom: 6 }}>{item.icon}</View>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "center",
                  color:
                    selectedTab == item.screen
                      ? COLORS.black
                      : COLORS.secondaryTextColor,
                  lineHeight: 14 * 1.2,
                }}
              >
                {item.screen}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
