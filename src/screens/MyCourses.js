import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { Button, Header, MyCoursesComponent } from "../components";
import { AREA, COLORS, FONTS, SIZES, courses } from "../constants";
import { useEffect } from "react";
import * as FileSystem from "expo-file-system";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ResizeMode, Video } from "expo-av";
import { Play } from "../svg";
import Modal from "react-native-modal";

export default function MyCourses() {
  const navigation = useNavigation();
  const [category, setCategory] = useState("Ongoing");
  const [showModal, setShowModal] = useState(false);
  const [video, setVideo] = useState([]);
  
  const [freeSize, setFreeSize] = useState("");
  console.log("🚀 ~ MyCourses ~ freeSize:", freeSize);
  const [useSize, setUseSize] = useState("");
  console.log("🚀 ~ MyCourses ~ useSize:", useSize);

  console.log("🚀 ~ MyCourses ~ video:", video);
  const storagePath = `${FileSystem.documentDirectory}`;
  const isFocused = useIsFocused();

  const infoFile = async () => {
    try {
      const size = await FileSystem.getFreeDiskStorageAsync();
      const infoAsync = await FileSystem.getInfoAsync(storagePath);
      // console.log("🚀 ~ infoFile ~ iinfo:", infoAsync);

      const totalSize = await FileSystem.getTotalDiskCapacityAsync();
      console.log("🚀 ~ totalSize:", JSON.stringify(totalSize));
      console.log("🚀 ~ size:", size);

      // const totalSizeKB = size / Math.pow(1024, 1);
      // console.log("🚀 ~ infoFile ~ totalSizeKB:", totalSizeKB);
      // const totalSizeMB = size / Math.pow(1024, 2);
      // console.log("🚀 ~ infoFile ~ totalSizeMB:", totalSizeMB);
      const totalSizeGB = size / Math.pow(1024, 2);
      console.log("🚀 ~ infoFile ~ totalSizeGB:", totalSizeGB);

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
    return <Header title="Downloads" goBack={false} />;
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
            alignItems: "flex-start",

            alignContent: "flex-end",
            alignItems: "flex-end",
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

        <FlatList
          data={video}
          keyExtractor={(item) => item}
          contentContainerStyle={{
            paddingTop: 20,
            // paddingHorizontal: 20,
          }}
          numColumns={1}
          renderItem={({ item, index }) => {
            return (
              // <MyCoursesComponent
              //     item={item}
              //     ongoingCourse={
              //         category === "Ongoing" ? true : false
              //     }
              // />
              <TouchableOpacity
                style={{
                  marginHorizontal: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 1,
                  borderBottomWidth: 1,
                  borderBottomColor: "#E7E6E7",
                }}
                onPress={() =>
                  navigation.navigate("OffLinePlayer", {
                    item: `${storagePath}/${item}`,
                  })
                }
              >
                <Play />
                <View
                  style={{
                    marginLeft: 8,
                    flex: 1,
                    marginVertical: 20,
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.H6,
                      // textTransform: "capitalize",
                      color: COLORS.black,
                      lineHeight: 14 * 1.5,
                    }}
                  >
                    {item}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, ...AREA.AndroidSafeArea }}>
      {renderBackground()}
      {renderHeader()}
      {renderCategories()}
      {renderContent()}
      {renderModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  video: {
    alignSelf: "center",
    width: SIZES.width - 10,
    height: 220,
    marginHorizontal: 20,
    //width: "100%",
    height: "100%",
  },
});
