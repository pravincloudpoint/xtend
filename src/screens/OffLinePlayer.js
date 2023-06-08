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
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Modal from "react-native-modal";
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
  const [showModal, setShowModal] = useState(false);

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
      ToastAndroid.show('Successfully delete!', ToastAndroid.LONG);
      // const size=await FileSystem.getFreeDiskStorageAsync()
      // const totalSize= await FileSystem.getTotalDiskCapacityAsync()
      // console.log("🚀 ~ deleteFile ~ totalSize:",JSON.stringify(totalSize));
      // console.log("🚀 ~ deleteFile ~ size:", size);
      navigation.goBack(null) 
    } catch (e) {
      console.error(e);
      ToastAndroid.show('Failed delete!', ToastAndroid.LONG);
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
  function renderModal() {
    return (
        <Modal
            isVisible={showModal}
            onBackdropPress={setShowModal}
            hideModalContentWhileAnimating={true}
            backdropTransitionOutTiming={0}
            style={{ margin: 0 }}
            animationIn="zoomIn"
            animationOut="zoomOut"
        >
            <View
                style={{
                    width: SIZES.width - 40,
                    backgroundColor: COLORS.white,
                    marginHorizontal: 20,
                    borderRadius: 10,
                    paddingHorizontal: 20,
                    paddingTop: 40,
                    paddingBottom: 30,
                }}
            >
                <Text
                    style={{
                        textAlign: "center",
                        ...FONTS.H2,
                        lineHeight: 20 * 1.5,
                        marginBottom: 30,
                        textTransform: "capitalize",
                    }}
                >
                    Are you sure you {"\n"} want to Delete File ?
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <TouchableOpacity
                        style={{
                            width: 130,
                            height: 48,
                            backgroundColor: COLORS.white,
                            borderRadius: 10,
                            justifyContent: "center",
                            alignItems: "center",
                            marginHorizontal: 7.5,
                            borderColor: COLORS.goldenTransparent_05,
                            borderWidth: 1,
                        }}
                        onPress={() => {
                            setShowModal(false);
                            deleteFile(item)
                        }}
                    >
                        <Text
                            style={{
                                color: COLORS.mainColor,
                                ...FONTS.Lato_700Bold,
                                fontSize: 18,
                                textTransform: "capitalize",
                            }}
                        >
                            Sure
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: 130,
                            height: 48,
                            backgroundColor: COLORS.btnColor,
                            borderRadius: 10,
                            justifyContent: "center",
                            alignItems: "center",
                            marginHorizontal: 7.5,
                        }}
                        onPress={() => setShowModal(false)}
                    >
                        <Text
                            style={{
                                color: COLORS.white,
                                ...FONTS.Lato_700Bold,
                                fontSize: 18,
                                textTransform: "capitalize",
                            }}
                        >
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
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
          // onPress={() => deleteFile(item)}
          onPress={() => setShowModal(true)}
        ></Button>
        {/* <Button
            title="infoFile"
            containerStyle={{ width: "100%", height: 50 }}
            onPress={() => infoFile(item)}
          ></Button> */}
      </View>
      {renderTabView()}
      {renderModal()}
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
