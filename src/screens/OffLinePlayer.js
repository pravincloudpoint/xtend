import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import { COLORS, FONTS, SIZES } from "../constants";
import { ArrowWhite, Heart, Reload, Book, CourseUser, Rating } from "../svg";
import {
  DescriptionSectionComponent,
  LessonsSectionComponent,
  InstructorSectionComponent,
  ReviewsSectionComponent,
  Button,
} from "../components";
import { Video, ResizeMode } from "expo-av";
import { downloadAsync } from "expo-file-system";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ScreenOrientation from "expo-screen-orientation";
import { ToastAndroid } from "react-native";

export default function OffLinePlayer() {
  const storagePath = `${FileSystem.documentDirectory}`;
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  console.log("🚀 ~ OffLinePlayer ~ item:", item);

  // console.log("🚀 ~ Player ~ item:", item, storagePath);
  //   const FirstRoute = () => <DescriptionSectionComponent item={item} />;
  //   const SecondRoute = () => <LessonsSectionComponent item={item} />;
  const ThirdRoute = () => <InstructorSectionComponent item={item} />;
  // const FourthRoute = () => <ReviewsSectionComponent item={item} />;

  const renderScene = SceneMap({
    // first: FirstRoute,
    // second: SecondRoute,
    third: ThirdRoute,
    // fourth: FourthRoute,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    // { key: "first", title: "Description" },
    // { key: "second", title: "Lessons" },
    { key: "third", title: "Instructor" },
    // { key: "fourth", title: "Reviews" },
  ]);
  // const fileName = item.Filename;
  const downloadVideo = async (item) => {
    console.log("🚀 ~ downloadVideo ~ item:", item);
    //const videoUrl="http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4";
    const { URL, Filename } = item;
    console.log("🚀 ~ downloadVideo ~ URL:", URL);
    console.log("🚀 ~ downloadVideo ~ Filename:", Filename);

    const Url = `http://192.168.30.1/frm/${URL}`;

    console.log("🚀 ~ downloadVideo ~ Url:", Url);

    const fileUri = FileSystem.documentDirectory + Filename;

    try {
      const { uri } = await FileSystem.downloadAsync(Url, fileUri);
      console.log("Video downloaded to:", uri);
    } catch (error) {
      console.error("Failed to download video:", error);
    }
  };

  const deleteFile = async (videoUrl) => {
    try {
      console.log("deleteFile ===>", videoUrl);
      await FileSystem.deleteAsync(videoUrl);
      console.log("deleteAsync ===>");
      ToastAndroid.show('Successfully delete!', ToastAndroid.SHORT);
      // const size=await FileSystem.getFreeDiskStorageAsync()
      // const totalSize= await FileSystem.getTotalDiskCapacityAsync()
      // console.log("🚀 ~ deleteFile ~ totalSize:",JSON.stringify(totalSize));
      // console.log("🚀 ~ deleteFile ~ size:", size);
    } catch (e) {
      console.error(e);
      ToastAndroid.show('Failed delete!', ToastAndroid.SHORT);
    }
  };

  const infoFile = async () => {
    try {
      const data = FileSystem.readDirectoryAsync(storagePath);
      data
        .then((data) => {
          console.log("🚀 ~ infoFile ~ data:", data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    } catch (e) {
      console.error(e);
    }
  };
  function setOrientation() {
    if (Dimensions.get("window").height > Dimensions.get("window").width) {
      //Device is in portrait mode, rotate to landscape mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      //Device is in landscape mode, rotate to portrait mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }
  function renderHeader() {
    return (
      <ImageBackground
        style={{ height: 240, width: "100%" }}
        source={require("../assets/images/background/background-02.png")}
      >
        <View
          style={{
            paddingTop: 20,
            // paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              alignItems: "flex-start",
              // marginBottom: 17,
            }}
          >
            <Video
              // style={styles.video}
              style={{ width: Dimensions.get("window").width, height: "100%" }}
              // resizeMode="contain"
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              source={{
                uri: item,
              }}
              useNativeControls
              shouldPlay
              onFullscreenUpdate={setOrientation}
            />
          </View>
        </View>
      </ImageBackground>
    );
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

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: COLORS.mainColor,
        height: 3,
        bottom: -1.5,
      }}
      style={{
        backgroundColor: "transparent",
        elevation: 0,
        borderBottomWidth: 1,
        borderBottomColor: "#EBD4EA",
      }}
      activeColor={COLORS.mainColor}
      inactiveColor={COLORS.secondaryTextColor}
      labelStyle={{ fontSize: 8, ...FONTS.Spartan_600SemiBold }}
    />
  );

  function renderTabView() {
    return (
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      {renderBackground()}
      {renderHeader()}
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Button
          title="delete"
          containerStyle={{ width: "95%", height: 50 }}
          onPress={() => deleteFile(item)}
        ></Button>
        {/* <Button
            title="infoFile"
            containerStyle={{ width: "100%", height: 50 }}
            onPress={() => infoFile(item)}
          ></Button> */}
      </View>
      {renderTabView()}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 2,
    marginHorizontal: 5,
    borderRadius: 6,
    backgroundColor: COLORS.gray,
  },
  // video: {
  //   alignSelf: "center",
  //   width: SIZES.width - 10,
  //   // height: 220,
  //   marginHorizontal: 20,
  //   //width: "100%",
  //   height: "100%",
  // },
});
