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
import React, { useEffect, useRef, useState } from "react";
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
  const video = useRef(null);
  const { item, url } = route.params;
  console.log("🚀 ~ file: OffLinePlayer.js:39 ~ item:", url);
  // console.log("🚀 ~ OffLinePlayer ~ item:", item);

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

  const [savedPosition, setSavedPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [dataArray, setDataArray] = useState([]);

  const deleteFile = async (url) => {
    try {
      // console.log("deleteFile ===>", url);
      await deletedDownloadVideo(item);

      ToastAndroid.show("Successfully delete!", ToastAndroid.LONG);
      // const size=await FileSystem.getFreeDiskStorageAsync()
      // const totalSize= await FileSystem.getTotalDiskCapacityAsync()
      // console.log("🚀 ~ deleteFile ~ totalSize:",JSON.stringify(totalSize));
      // console.log("🚀 ~ deleteFile ~ size:", size);
      navigation.goBack(null);
    } catch (e) {
      console.error(e.message);
      ToastAndroid.show("Failed delete!", ToastAndroid.LONG);
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
  useEffect(() => {
    getSavedPosition();
    return () => {
      // onPlaybackStatusUpdate();
    };
    //AsyncStorage.removeItem('videoAnalytics')
  }, []);

  const getSavedPosition = async () => {
    await AsyncStorage.getItem("videoAnalytics").then((readObjs) => {
      const data = JSON.parse(readObjs);
      setDataArray(data);
      const find = data.find((obj) => obj.id === item.id);
      // console.log("🚀 ~ getSavedPosition ~ find:", typeof find);
      if (!find.Empty) {
        setSavedPosition(find.status.positionMillis);
      }
    });
  };

  const onPlaybackStatusUpdate = async (status) => {
    const newObject = await { ...item, status };
    if (status.isPlaying) {
      updateOrAddObject(newObject);
    }
  };

  const updateOrAddObject = async (newObject) => {
    console.log('====================================');
    console.log();
    console.log('====================================');
    if (dataArray == null) {
      setDataArray([newObject]);
      await AsyncStorage.setItem("videoAnalytics", JSON.stringify(dataArray));
    }
    const indexToUpdate = dataArray.findIndex(
      (obj) => obj.name === newObject.name
    );
    if (indexToUpdate !== -1) {
      console.log("------------if----------------");
      setDataArray((prevDataArray) => {
        const updatedArray = prevDataArray.map((obj, index) => {
          if (index === indexToUpdate) {
            return { ...obj, ...newObject };
          }
          return obj;
        });
        AsyncStorage.setItem("videoAnalytics", JSON.stringify(updatedArray));
        return updatedArray;
      });
    } else {
      console.log("=============else=============");
      setDataArray((prevDataArray) => [newObject, ...prevDataArray]);
      await AsyncStorage.setItem("videoAnalytics", JSON.stringify(dataArray));
    }
  };

  const deletedDownloadVideo = async (item) => {
    const indexToUpdate = dataArray.findIndex((obj) => obj.id == item.id);
    if (indexToUpdate !== -1) {
      console.log("------------if--- deletedDownloadVideo---- false---------");
      setDataArray((prevDataArray) => {
        const updatedArray = prevDataArray.map((obj, index) => {
          if (index === indexToUpdate) {
            return { ...obj, deleted: true };
          }
          return obj;
        });
        console.log(
          "🚀 ~ file: OffLinePlayer.js:169 ~ updatedArray:",
          updatedArray
        );
          AsyncStorage.setItem("videoAnalytics", JSON.stringify(updatedArray));
        return updatedArray;
      });
      await FileSystem.deleteAsync(url);
    } else {
      console.log("------------else-- deletedDownloadVideo----- false--------");
    }
  };
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
              // alignItems: "flex-start",
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
                uri: url,
              }}
              useNativeControls
              // shouldPlay
              onFullscreenUpdate={setOrientation}
              shouldPlay={isPlaying}
              positionMillis={savedPosition}
              onPlaybackStatusUpdate={onPlaybackStatusUpdate}
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
                deleteFile(url);
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
          marginVertical: 10,
        }}
      >
        <Button
          title="delete"
          containerStyle={{ width: "95%", height: 50 }}
          onPress={() => {
            video.current.pauseAsync();
            setShowModal(true);
          }}
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
