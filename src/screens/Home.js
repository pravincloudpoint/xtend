import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import {
  AREA,
  COLORS,
  FONTS,
  SIZES,
  categories,
  promo,
  courses,
  courses1,
} from "../constants";
import {
  CategoryComponent,
  CardComponent,
  PlayAudioComponent,
  Button,
  DescriptionSectionComponent,
} from "../components";
import { InputSearch } from "../svg";
import { useDispatch, useSelector } from "react-redux";
import OttSlice, { fetchOtt } from "../Slice/OttSlice";
import { Video, ResizeMode } from "expo-av";
import { classes } from "../constants/constants";
import * as ScreenOrientation from "expo-screen-orientation";
import { TouchableHighlight } from "react-native-gesture-handler";

export default function Home() {
  const navigation = useNavigation();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [data, setData] = useState();
  console.log("🚀 ~ Home ~ data:", data);

  const dispatch = useDispatch();
  const video = useSelector((state) => state);

  // console.log("🚀 ~ Home ~ video:", JSON.stringify(video));

  // setFirst(ott.ott.data.results);

  const getData = async () => {
    const videos = await video;
    setData(videos.video.data[2]);
  };
  // console.log("data",data.Package.Name);
  // console.log("data",data.Files);

  useEffect(() => {
    dispatch(fetchOtt());
    getData();
  }, []);
  function updateCurrentSlideIndex(e) {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / SIZES.width);
    setCurrentSlideIndex(currentIndex);
  }

  const topRated = courses.filter(function (course) {
    return course.topRated;
  });
  const popular = courses.filter(function (course) {
    return course.popular;
  });
  const skill = courses.filter(function (course) {
    return course.class == "Skill Development";
  });
  console.log("========skill===============", skill);
  function renderDots() {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        {courses.slice(0, 5).map((_, index) => {
          return (
            <View
              key={index}
              style={[
                styles.dot,
                currentSlideIndex == index && {
                  width: 25,
                  backgroundColor: COLORS.black,
                  borderRadius: 6,
                },
              ]}
            />
          );
        })}
      </View>
    );
  }

  function renderSearch() {
    return (
      <View
        style={{
          height: 150,
          backgroundColor: "rgba(255,255,255,0.5)",
          borderRadius: 10,
          padding: 20,
          marginBottom: 20,
          marginHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <Image
            source={{
              uri: "https://via.placeholder.com/72x72",
            }}
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              marginRight: 10,
            }}
          />
          <Text style={{ ...FONTS.H3, color: COLORS.black }}>
            Hello, Kristin
          </Text>
        </View>
        <Text
          style={{
            ...FONTS.Lato_400Regular,
            fontSize: 14,
            color: COLORS.lightBlack,
            marginBottom: 12,
            lineHeight: 14 * 1.7,
          }}
        >
          Find a course you want to learn.
        </Text>
        <ImageBackground
          style={{
            width: "100%",
            height: 42,
            flexDirection: "row",
            alignItems: "center",
          }}
          source={require("../assets/images/background-02.png")}
          imageStyle={{ borderRadius: 5 }}
        >
          <View style={{ marginLeft: 16 }}>
            <InputSearch />
          </View>
          <TextInput
            placeholder="Search"
            style={{
              flex: 1,
              marginLeft: 8,
              flex: 1,
              marginRight: 16,
            }}
          />
        </ImageBackground>
      </View>
    );
  }
  function setOrientation() {
    if (Dimensions.get("window").height > Dimensions.get("window").width) {
      //Device is in portrait mode, rotate to landscape mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      //Device is in landscape mode, rotate to portrait mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }
  function renderPromo() {
    return (
      <View
        style={{
          padding: 10,
          borderRadius: 10,
        }}
      >
        <FlatList
          horizontal={true}
          index={4}
          data={courses.slice(0, 5)}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          contentContainerStyle={{ marginBottom: 16 }}
          renderItem={({ item }) => (
            // <ImageBackground
            //   source={item.thumbnail}
            //   style={{
            //     width: SIZES.width - 10,
            //     height: 280,
            //     // marginHorizontal: 20,
            //   }}
            //   imageStyle={{ borderRadius: 10 }}

            // >
            // </ImageBackground>
            // <TouchableOpacity
            //   style={{ flex: 1 / 3, aspectRatio: 1 }}
            //   onPress={() => navigation.navigate("Player", { item: item })}
            // >
            //   <Image
            //     style={{
            //       width: 300,
            //       height: SIZES.height,
            //     }}
            //     resizeMode="cover"
            //     // style={{
            //     //   width: SIZES.width - 4,
            //     //   height: 280,
            //     // }}
            //     imageStyle={{ borderRadius: 10 }}
            //     source={item.thumbnail}
            //   ></Image>
            // </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Player", { item: item })}
            >
              <ImageBackground
                source={item.image}
                style={{
                  width: SIZES.width - 40,
                  height: 220,
                  marginHorizontal: 10,
                }}
                imageStyle={{ borderRadius: 10 }}
              ></ImageBackground>
            </TouchableOpacity>

            // <Video
            //   style={styles.video}
            //   // resizeMode="contain"
            //   resizeMode={ResizeMode.CONTAIN}
            //   isLooping
            //   source={{
            //     // uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            //     uri: item.url,
            //   }}
            //   useNativeControls
            //   onFullscreenUpdate={setOrientation}
            // />
          )}
        />
        {renderDots()}
      </View>
    );
  }

  function renderHeader() {
    return (
      <View style={{ marginBottom: 30 }}>
        <View style={{ height: 40 }} />
        <Image
          source={require("../assets/images/background.png")}
          style={{
            position: "absolute",
            width: SIZES.width,
            height: "100%",
          }}
        />
        {/* {renderSearch()} */}
        {data && renderPromo()}
      </View>
    );
  }

  function renderCategories() {
    return (
      <View style={{ marginBottom: 30 }}>
        <CategoryComponent
          title={"Subjects"}
          onPress={() => navigation.navigate("CategoryGrid")}
        />
        <FlatList
          data={categories}
          horizontal={true}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("CategoryList", {
                    item: item,
                  })
                }
              >
                <ImageBackground
                  style={{
                    paddingHorizontal: 20,
                    paddingTop: 8,
                    height: 89,
                    marginRight: 10,
                  }}
                  source={item.image}
                  imageStyle={{ borderRadius: 10 }}
                >
                  <Text
                    style={{
                      ...FONTS.Lato_700Bold,
                      color: COLORS.white,
                      lineHeight: 14 * 1.5,
                      fontSize: 14,
                    }}
                  >
                    {item.name}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={{ paddingLeft: 20 }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
  function renderClasses() {
    return (
      <View style={{ marginBottom: 30 }}>
        <CategoryComponent
          title={"Class List"}
          onPress={() =>
            navigation.navigate("ClassGrid", { className: classes })
          }
        />
        <FlatList
          data={classes}
          horizontal={true}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("CategoryGrid", {
                    className: item,
                  })
                }
              >
                <ImageBackground
                  style={{
                    paddingHorizontal: 20,
                    paddingTop: 8,
                    height: 89,
                    marginRight: 10,
                  }}
                  source={item.image}
                  imageStyle={{ borderRadius: 10 }}
                >
                  <Text
                    style={{
                      ...FONTS.Lato_700Bold,
                      color: COLORS.white,
                      lineHeight: 14 * 1.5,
                      fontSize: 14,
                    }}
                  >
                    {item.class}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={{ paddingLeft: 20 }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  function renderTopRated() {
    return (
      <View style={{ marginBottom: 30 }}>
        <CategoryComponent
          title={"New Additions"}
          onPress={() =>
            navigation.navigate("TopRatedList", {
              name: "New Additions",
              topRated,
            })
          }
        />
        {data ? (
          popular.map((item, index, array) => {
            const lastIndex = array.length - 1;
            return (
              <View
                key={index}
                style={{
                  marginHorizontal: 20,
                }}
              >
                <CardComponent
                  item={item}
                  lastComponent={index == lastIndex ? true : false}
                  onPress={() =>
                    navigation.navigate("CourseDetails", {
                      item: item,
                    })
                  }
                />
              </View>
            );
          })
        ) : (
          <Text
            style={{
              alignSelf: "center",
              color: COLORS.lightGray,
            }}
          >
            Disconnected
          </Text>
        )}
        {/* {data ? (
          <FlatList
            data={popular}
            horizontal={false}
            keyExtractor={({ id }, index) => id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                item.popular === true && (
                  <PlayAudioComponent
                    item={item}
                    onPress={() =>
                      navigation.navigate("CourseDetails", {
                        item: item,
                      })
                    }
                  />
                )
              );
            }}
            contentContainerStyle={{ paddingLeft: 20 }}
          />
        ) : (
          <Text
            style={{
              alignSelf: "center",
              color: COLORS.lightGray,
            }}
          >
            Disconnected
          </Text>
        )} */}
      </View>
    );
  }
  function renderSkill() {
    return (
      <View style={{ marginBottom: 30 }}>
        <CategoryComponent
          title={"Skill Development"}
          onPress={() =>
            navigation.navigate("TopRatedList", {
              name: "Skill Development",
              skill,
            })
          }
        />
        {data ? (
          <FlatList
            data={skill}
            horizontal={true}
            keyExtractor={({ id }, index) => id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                item.popular === true && (
                  <PlayAudioComponent
                    item={item}
                    onPress={() =>
                      navigation.navigate("CourseDetails", {
                        item: item,
                      })
                    }
                  />
                )
              );
            }}
            contentContainerStyle={{ paddingLeft: 20 }}
          />
        ) : (
          <Text
            style={{
              alignSelf: "center",
              color: COLORS.lightGray,
            }}
          >
            Disconnected
          </Text>
        )}
      </View>
    );
  }
  function renderPopular() {
    return (
      <View style={{ marginBottom: 30 }}>
        <CategoryComponent
          // title={"Recently Viewed"}
          title={"Popular"}
          onPress={() =>
            navigation.navigate("TopRatedList", {
              name: "Recently Viewed",
              popular,
            })
          }
        />
        {data ? (
          <FlatList
            data={popular}
            horizontal={true}
            keyExtractor={({ id }, index) => id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                item.popular === true && (
                  <PlayAudioComponent
                    item={item}
                    onPress={() =>
                      navigation.navigate("CourseDetails", {
                        item: item,
                      })
                    }
                  />
                )
              );
            }}
            contentContainerStyle={{ paddingLeft: 20 }}
          />
        ) : (
          <Text
            style={{
              alignSelf: "center",
              color: COLORS.lightGray,
            }}
          >
            Disconnected
          </Text>
        )}
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: COLORS.white,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flex: 1 }}>
        {renderHeader()}
        {renderClasses()}
        {renderSkill()}
        {renderTopRated()}
        {renderPopular()}
        {/* <Button
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "flex-end",
            zIndex: 999,
            alignSelf: "flex-end",
            color: "#fff",
          }}
          containerStyle={{
            marginHorizontal: 20,
            marginBottom: SIZES.height / 25,
          }}
          onPress={() => {}}
          title="Call API"
        ></Button> */}
      </View>
    </KeyboardAwareScrollView>
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
    width: SIZES.width - 40,
    height: 220,
    marginHorizontal: 20,
  },
});
