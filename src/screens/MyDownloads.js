import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ToastAndroid,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import {
  Button,
  CardComponent,
  CategoryComponent,
  Header,
  MyCoursesComponent,
} from "../components";
import { AREA, COLORS, FONTS, SIZES, courses } from "../constants";
import { useEffect } from "react";
import * as FileSystem from "expo-file-system";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ResizeMode, Video } from "expo-av";
import { Clock, DeleteSvg, Heart, Play } from "../svg";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MainLayout from "./MainLayout";

export default function MyDownloads() {
  const navigation = useNavigation();
  const [category, setCategory] = useState("Ongoing");
  const [showModal, setShowModal] = useState(false);
  const [showModals, setShowModals] = useState(false);
  const [deleteVideo, setDeleteVideo] = useState();
  const [video, setVideo] = useState([]);
  // console.log("🚀 ~ file: MyDownloads.js:34 ~ video:", video);

  const [freeSize, setFreeSize] = useState("");
  const [useSize, setUseSize] = useState("");
  // console.log("🚀 ~ file: MyDownloads.js:45 ~ useSize:", useSize);

  const storagePath = `${FileSystem.documentDirectory}`;
  const isFocused = useIsFocused();

  const infoFile = async () => {
    try {
      const size = await FileSystem.getFreeDiskStorageAsync();
      const infoAsync = await FileSystem.getInfoAsync(storagePath);
      // console.log("🚀 ~ infoFile ~ iinfo:", infoAsync);

      const totalSize = await FileSystem.getTotalDiskCapacityAsync();
      // console.log("🚀 ~ totalSize:", JSON.stringify(totalSize));
      // console.log("🚀 ~ size:", size);

      // const totalSizeKB = size / Math.pow(1024, 1);
      // console.log("🚀 ~ infoFile ~ totalSizeKB:", totalSizeKB);
      // const totalSizeMB = size / Math.pow(1024, 2);
      // console.log("🚀 ~ infoFile ~ totalSizeMB:", totalSizeMB);
      const totalSizeGB = size / Math.pow(1024, 2);
      // console.log("🚀 ~ infoFile ~ totalSizeGB:", totalSizeGB);

      const allFileSize = infoAsync.size / Math.pow(1024, 2);
      // console.log("🚀 ~ infoFile ~ allFileSize:", allFileSize.toFixed(2));
      setFreeSize(totalSizeGB.toFixed(2));
      setUseSize(allFileSize.toFixed(2));

      // const getInfoAsync = await FileSystem.getInfoAsync(storagePath);
      // console.log("🚀 ~ infoFile ~ getInfoAsync:", getInfoAsync);
      // allFreeSize()
      await FileSystem.readDirectoryAsync(storagePath)
        .then((data) => {
          console.log("🚀 ~ .then ~ data:", data);
          // setVideo(data.slice(1));
          setVideo(data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    } catch (e) {
      console.error(e);
    }
  };
  const [dataArray, setDataArray] = useState([]);
  console.log("🚀 ~ file: MyDownloads.js:84 ~ dataArray:", dataArray);
  const downloadVideo = dataArray?.filter(function (video) {
    return video.deleted == false;
    // video.downloaded == true &&
  });
  console.log("🚀 ~ file: MyDownloads.js:86 ~ downloadVideo:", downloadVideo);

  const getSavedPosition = async () => {
    await AsyncStorage.getItem("videoAnalytics").then((readObjs) => {
      const data = JSON.parse(readObjs);
      setDataArray(data);
      updateOrAddObject();
    });
  };
  const updateOrAddObject = async () => {
    video.map((id) => {
      console.log("🚀 ~ file: MyDownloads.js:108~ id:", id);
      const indexToUpdate = dataArray.findIndex((obj) => obj.id == id);

      if (indexToUpdate !== -1) {
        console.log("------------if--- downloadVideo-------------");
        setDataArray((prevDataArray) => {
          const updatedArray = prevDataArray.map((obj, index) => {
            if (index === indexToUpdate) {
              return { ...obj, downloaded: true };
            }
            return obj;
          });
          AsyncStorage.setItem("videoAnalytics", JSON.stringify(updatedArray));
          return updatedArray;
        });
      } else {
        console.log("------------else-- downloadVideo-------------");
      }
    });
  };
  const deleteFile = async (videoUrl) => {
    try {
      console.log("deleteFile ===>", videoUrl);
      await FileSystem.deleteAsync(videoUrl);
      console.log("deleteAsync ===>");
      ToastAndroid.show("Successfully delete!", ToastAndroid.LONG);
      infoFile();
    } catch (e) {
      console.error(e);
      ToastAndroid.show("Failed delete!", ToastAndroid.LONG);
    }
  };

  const allFreeSize = () => {
    FileSystem.getFreeDiskStorageAsync()
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        const totalSizeGB = response / Math.pow(1024, 2);
        console.log("🚀 ~ infoFile ~ totalSizeGB:", totalSizeGB);
        setFreeSize(totalSizeGB.toFixed(2));
      })
      .catch((err) => {
        console.log("🚀 ~ FileSystem.readDirectoryAsync ~ err:", err);
      });
  };
  const allFileSystemDataDelete = () => {
    FileSystem.readDirectoryAsync(storagePath)
      .then((response) => {
        console.log("🚀 ~ FileSystem.readDirectoryAsync ~ response:", response);
        for (const dir of video) {
          console.log("🚀 ~ FileSystem.readDirectoryAsync ~ dir:", dir);
          FileSystem.deleteAsync(`${storagePath}/${dir}`);
        }

        video.map((id) => {
          console.log("🚀 ~ file: MyDownloads.js:108~ id:", id);
          const indexToUpdate = dataArray.findIndex((obj) => obj.id == id);

          if (indexToUpdate !== -1) {
            console.log("------------if--- downloadVideo-------------");
            setDataArray((prevDataArray) => {
              const updatedArray = prevDataArray.map((obj, index) => {
                if (index === indexToUpdate) {
                  return { ...obj, deleted: true };
                }
                return obj;
              });
              AsyncStorage.setItem(
                "videoAnalytics",
                JSON.stringify(updatedArray)
              );
              return updatedArray;
            });
          } else {
            console.log("------------else-- downloadVideo-------------");
          }
        });
        infoFile();
      })
      .then(() => {
        infoFile();
      })
      .catch((err) => {
        console.log("🚀 ~ FileSystem.readDirectoryAsync ~ err:", err);
      });
  };
  useEffect(() => {
    infoFile();
    getSavedPosition();
  }, [isFocused]);

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

  function renderHeader() {
    // return <Header title="Downloads" goBack={false} />;
    return (
      <Header
        title="Downloads"
        goBack={true}
        onPress={() => navigation.navigate("MainLayout")}
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
            Are you sure you {"\n"} want to Delete All Files ?
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
                allFileSystemDataDelete();
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

  function renderCategories() {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: "row",
          marginTop: 8,
        }}
      >
        {/* <TouchableOpacity
          style={{
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor:
              category === "Ongoing" ? COLORS.mainColor : "#E7E6E7",
          }}
          onPress={() => setCategory("Ongoing")}
        >
          <Text
            style={{
              ...FONTS.Lato_700Bold,
              fontSize: 14,
              lineHeight: 14 * 1.7,
              paddingBottom: 8,
              color:
                category === "Ongoing"
                  ? COLORS.black
                  : COLORS.secondaryTextColor,
            }}
          >
            Ongoing
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor:
              category === "Completed" ? COLORS.mainColor : "#E7E6E7",
          }}
          onPress={() => setCategory("Completed")}
        >
          <Text
            style={{
              ...FONTS.Lato_700Bold,
              fontSize: 14,
              lineHeight: 14 * 1.7,
              paddingBottom: 8,
              color:
                category === "Completed"
                  ? COLORS.black
                  : COLORS.secondaryTextColor,
            }}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderContent() {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            // alignItems: "flex-start",

            alignContent: "flex-end",
            // alignItems: "flex-end",
            paddingRight: 10,
          }}
        >
          <Text
            style={{
              ...FONTS.Lato_Regular,
              fontSize: 10,
              lineHeight: 14 * 1.7,
              color: COLORS.lightGray,
            }}
          >
            Used Size : {useSize} MB
            {/* Used Size : {useSize} GB */}
          </Text>
          <Text
            style={{
              ...FONTS.Lato_Regular,
              fontSize: 10,
              lineHeight: 14 * 1.7,
              color: COLORS.lightGray,
            }}
          >
            Free Size : {freeSize} MB
            {/* Free Size : {freeSize} GB */}
          </Text>
          <Text
            style={{
              ...FONTS.Lato_Regular,
              fontSize: 10,
              lineHeight: 14 * 1.7,
              color: COLORS.lightGray,
            }}
            // onPress={() => allFileSystemDataDelete()}
            onPress={() => setShowModal(true)}
          >
            Delete All
          </Text>
        </View>
        <KeyboardAwareScrollView>
          {downloadVideo?.map((item, index, array) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  marginHorizontal: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: "#E7E6E7",
                  padding: 10,
                }}
                onPress={() =>
                  navigation.navigate("OffLinePlayer", {
                    url: `${storagePath}/${item.id}`,
                    item,
                  })
                }
              >
                <ImageBackground
                  source={{ uri: `${item.thumbnail}` }}
                  style={{ width: 160, height: 100 }}
                  imageStyle={{ borderRadius: 10, resizeMode: "stretch" }}
                ></ImageBackground>
                <View
                  style={{ flex: 1, paddingVertical: 4, paddingLeft: 12 }}
                  key={index}
                >
                  <Text
                    numberOfLines={2}
                    style={{
                      width: "80%",
                      ...FONTS.Lato_500Medium,
                      fontSize: 14,
                      textTransform: "capitalize",
                      lineHeight: 14 * 1.5,
                      color: COLORS.black,
                    }}
                  >
                    {item.name ? item.name : item.Filename}
                  </Text>
                  <Text
                    numberOfLines={6}
                    style={{
                      width: "80%",
                      ...FONTS.Lato_500Medium,
                      fontSize: 14,
                      textTransform: "capitalize",
                      lineHeight: 14 * 1.5,
                      color: COLORS.black,
                    }}
                  >
                    {item.class ? item.class : item.class}
                  </Text>
                  <Text
                    numberOfLines={5}
                    style={{
                      width: "80%",
                      ...FONTS.Lato_500Medium,
                      fontSize: 14,
                      textTransform: "capitalize",
                      lineHeight: 14 * 1.5,
                      color: COLORS.black,
                    }}
                  >
                    {item.board ? item.board : item.board}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Clock strokeColor={COLORS.secondaryTextColor} />
                    <Text
                      style={{
                        marginLeft: 6,
                        ...FONTS.Lato_400Regular,
                        fontSize: 14,
                        color: COLORS.gray,
                      }}
                    >
                      {item.duration}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </KeyboardAwareScrollView>
      </>
    );
  }
  function renderModals() {
    console.log("🚀 ~ renderModals ~ deleteVideo:", deleteVideo);
    return (
      <Modal
        isVisible={showModals}
        onBackdropPress={setShowModals}
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
                setShowModals(false);
                deleteFile(`${storagePath}/${deleteVideo}`);
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
              onPress={() => setShowModals(false)}
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
    // <SafeAreaView style={{ flex: 1, ...AREA.AndroidSafeArea }}>
    <SafeAreaView style={{ flex: 1 }}>
      {renderBackground()}
      {renderHeader()}
      {renderCategories()}
      {renderContent()}
      {renderModal()}
      {renderModals()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  video: {
    width: SIZES.width - 10,
    // height: 220,
    marginHorizontal: 20,
    //width: "100%",
    height: "100%",
  },
});
