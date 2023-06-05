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
import { Header, MyCoursesComponent } from "../components";
import { AREA, COLORS, FONTS, SIZES, courses } from "../constants";
import { useEffect } from "react";
import * as FileSystem from "expo-file-system";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ResizeMode, Video } from "expo-av";
import { Play } from "../svg";

export default function MyCourses() {
  const navigation = useNavigation();
  const [category, setCategory] = useState("Ongoing");
  const [video, setVideo] = useState([]);
  const [freeSize, setFreeSize] = useState("");
  // console.log("🚀 ~ MyCourses ~ video:", video);
  const storagePath = `${FileSystem.documentDirectory}`;
  const isFocused = useIsFocused();

  const infoFile = async () => {
    try {
      const size = await FileSystem.getFreeDiskStorageAsync();
      const totalSize = await FileSystem.getTotalDiskCapacityAsync();
      console.log("🚀 ~ totalSize:", JSON.stringify(totalSize));
      console.log("🚀 ~ size:", size);
      const totalSizeKB = size / Math.pow(1024, 1);
      console.log("🚀 ~ infoFile ~ totalSizeKB:", totalSizeKB);
      const totalSizeMB = size / Math.pow(1024, 2);
      console.log("🚀 ~ infoFile ~ totalSizeMB:", totalSizeMB);
      const totalSizeGB = size / Math.pow(1024, 3);
      console.log("🚀 ~ infoFile ~ totalSizeGB:", totalSizeGB);
      setFreeSize(totalSizeGB.toFixed(2));

      const data = FileSystem.readDirectoryAsync(storagePath);
      data
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
            Free Size : {freeSize}
          </Text>
        </View>

        <FlatList
          data={video}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingTop: 20,
            // paddingHorizontal: 20,
          }}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
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
                    borderBottomWidth: 1,
                    borderBottomColor: "#E7E6E7",
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
