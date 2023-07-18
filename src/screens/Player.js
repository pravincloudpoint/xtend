import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  StatusBar,
  Image,
  ToastAndroid,
  Dimensions,
  ActivityIndicator,
  ProgressBarAndroid,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import * as ScreenOrientation from "expo-screen-orientation";

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
import { useState } from "react";

export default function Player() {
  const storagePath = `${FileSystem.documentDirectory}`;
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  console.log("🚀 ~ Player ~ item:", item);
  console.log("🚀 ~ Player ~ item: url", item.url);
  const videoURL = `http://192.168.30.1/frm/${item.URL}`;
  const video = useRef(null);

  // console.log("🚀 ~ Player ~ item:", item, storagePath);
  const FirstRoute = () => <DescriptionSectionComponent item={item} />;
  const SecondRoute = () => <LessonsSectionComponent item={item} />;
  const ThirdRoute = () => <InstructorSectionComponent item={item} />;
  const FourthRoute = () => <ReviewsSectionComponent item={item} />;

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
  });

  const layout = useWindowDimensions();
  const [status, setStatus] = React.useState({});
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    // { key: "first", title: "Description" },
    // { key: "second", title: "Lessons" },
    { key: "third", title: "Instructor" },
    // { key: "fourth", title: "Reviews" },
  ]);
  // const fileName = item.Filename;
  const [downloadProgress, setDownloadProgress] = useState("");
  console.log("🚀 ~ Player ~ downloadProgress:", downloadProgress);

  const downloadCallback = (downloadProgress) => {
    console.log("downloadCallbacks", downloadProgress);
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setDownloadProgress(progress * 100);
    console.log("🚀 ~ downloadCallback ~ progress:", progress);
  };

  const downloadVideo = async (item) => {
    console.log("🚀 ~ downloadVideo ~ item:", item);
    //const videoUrl="http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4";
    // const { URL, Filename } = item;
    const { url, name } = item;
    console.log("🚀 ~ downloadVideo ~ URL:", url);
    console.log("🚀 ~ downloadVideo ~ Filename:", name);

    // const Url = `http://192.168.30.1/frm/${URL}`;
    // console.log("🚀 ~ downloadVideo ~ Url:", Url);
    // const fileUri = FileSystem.documentDirectory + Filename;

    const fileUri = FileSystem.documentDirectory + name;
    console.log("🚀 ~ downloadVideo ~ fileUri:", fileUri);
    try {
      setDownloadProgress(1);
      const { uri } = await FileSystem.downloadAsync(url, fileUri);
      console.log("Video downloaded to:", uri);
      ToastAndroid.show("Successfully download!", ToastAndroid.LONG);
      setDownloadProgress(-1);
      // downloadCallback;
      console.log("Successfully download");
    } catch (error) {
      console.error("Failed to download video:", error);
      ToastAndroid.show("Failed download!", ToastAndroid.LONG);
    }
  };
  useEffect(() => {
    const infoFile = async () => {
      await FileSystem.readDirectoryAsync(storagePath)
        .then((data) => {
          console.log("🚀 ~ .then ~ data:", data);
          data.map((down) => {
            if (down === item.name) {
              console.log("🚀This video is downloaded", down);
              setDownloadProgress(-1);
            } else {
              console.log("🚀 ~ .then ~ error");
            }
          });
          // setVideo(data.slice(1));
        })
        .catch((err) => {
          console.log("error", err);
        });
    };
    infoFile();
    video.current.playAsync();
  }, []);
  const deleteFile = async (videoUrl) => {
    try {
      console.log("deleteFile ===>", videoUrl);
      await FileSystem.deleteAsync(videoUrl);
      console.log("deleteAsync ===>");
      // const size=await FileSystem.getFreeDiskStorageAsync()
      // const totalSize= await FileSystem.getTotalDiskCapacityAsync()
      // console.log("🚀 ~ deleteFile ~ totalSize:",JSON.stringify(totalSize));
      // console.log("🚀 ~ deleteFile ~ size:", size);
    } catch (e) {
      console.error(e);
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
              //alignItems: "flex-start",
              // marginBottom: 17,
            }}
          >
            <Video
              ref={video}
              // style={styles.video}
              style={{ width: Dimensions.get("window").width, height: "100%" }}
              // resizeMode="contain"
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              source={{
                uri: item.url,
                //  uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                //uri: "http://192.168.30.1/frm/ui/cat/frmpackage/647dd7000a87b/content/3_Class 8 ICT Understanding HTML C10S1 _ WATCH ALL SESSIONS ONLY ON AAS VIDYALAYA APP.mp4",
              }}
              useNativeControls
              onFullscreenUpdate={setOrientation}
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
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
          marginVertical: 10,
        }}
      >
        {downloadProgress == 0 && (
          <Button
            title="download"
            containerStyle={{ width: "95%", height: 50 }}
            onPress={() => downloadVideo(item)}
          ></Button>
        )}
        {downloadProgress == 1 && (
          <View style={{ flexDirection: "row" }}>
            {/* <ActivityIndicator size="large" color="#000" /> */}
            <ActivityIndicator styleAttr="small" color="#2196F3" />
            <Text>downloading...</Text>
          </View>
        )}
        {/* {downloadProgress == -1 && (
          <Text>Download completed</Text>
        )} */}
        {downloadProgress == -1 && (
          <Button
            title="View Downloads"
            containerStyle={{ width: "95%", height: 50 }}
            onPress={() => {
              navigation.navigate("MyCourses");
              // video.current.pauseAsync();
              status.isPlaying
                ? video.current.pauseAsync()
                : video.current.pauseAsync();
            }}
          ></Button>
        )}
        {/* <Button 
         
          title="download" 
          containerStyle={{ width: "95%", height: 50 }}
          onPress={() => downloadVideo(item)}
        ></Button> */}
        {/* <Button
          title="delete"
          containerStyle={{ width: "100%", height: 50 }}
          onPress={() => deleteFile(item)}
        ></Button> */}
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
  video: {
    alignSelf: "center",
    width: SIZES.width - 10,
    // height: 220,
    marginHorizontal: 20,
    //width: "100%",
    height: "100%",
  },
});
