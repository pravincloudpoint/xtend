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
  Modal,
  Alert,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
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
  HomeSectionComponent,
  Button,
  DescriptionSectionComponent,
} from "../components";
import { EyeOn, InputSearch } from "../svg";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import OttSlice, { fetchOtt } from "../Slice/OttSlice";
import { Video, ResizeMode } from "expo-av";
import { classes, onboardingSlide } from "../constants/constants";
import * as ScreenOrientation from "expo-screen-orientation";
import { TouchableHighlight } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { selectContents, selectData } from "../Slice/selectors";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import {
  checkInternetConnectivity,
  getDeviceInfo,
} from "../components/DeviceInfo";
import { apiRes } from "../constants/dummyData";

export default function Home() {
  const navigation = useNavigation();
  const ref = useRef();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [data, setData] = useState([]);
  const [loginData, setLoginData] = useState();
  // console.log("🚀 ~ Home ~ data:", data);
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();

  const video = useSelector((state) => state.video, shallowEqual);
  // const video = useSelector(selectContents);
  console.log("🚀 ~ Home ~ data:", video.length);

  // console.log("🚀 ~ Home ~ video:", video);
  // console.log("🚀 ~ Home ~ video:", JSON.stringify(video));

  const getData = async () => {
    try {
      const videos = await video;
      console.log("🚀 ~ getData ~ isLoader:", videos.isLoader);
      setFlag(videos.isLoader);
      setData(videos.data.data);
    } catch (error) {
      console.log("🚀 ~ getData ~ error:", error);
      // setFlag(true);
    }
  };

  // testing api tag filter -----------------------------------------

  // const [tagData, setTagData] = useState({})
  // console.log("🚀 ~ file: Home.js:84 ~ tagData:", tagData);
  // let headersList = {
  //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  //   "Content-Type": "application/json",
  //   "Accept": "application/json"
  //  }
  // const readAPI = async () =>{
  //   let response = await fetch("http://20.204.171.156/frm/api/v1/packages/NewPVOD", {
  //     method: "GET",
  //     headers: headersList
  //   });
  //   let data = await response.json();

  //  console.log("data -------->",data);
  //  setTagData(data)
  // // console.log("🚀 ~ file: Home.js:99 ~ apiRes:", apiRes);
  // if (tagData.length > 0) {
  //   console.log("🚀 ~ file: Home.js:106 ~ tagData:", tagData.length);
  //     const tags = tagData?.filter(function (data) {
  //       return data.Package.Tags.class == "Class 10"
  //     });
  //     console.log("🚀 ~ file: Home.js:105 ~ tags: ----->", tags);
  //   }
  // }

  // end ---------------------------------------------------------------

  const getUserLogin = async () => {
    const isConnected = await checkInternetConnectivity();
    // console.log("🚀 ~ file: Home.js:82 ~ isConnected:", isConnected);

    await AsyncStorage.getItem("userData")
      .then((jsonValue) => {
        const user = jsonValue != null ? JSON.parse(jsonValue) : null;
        // console.log("🚀 ~ .then ~ loginData:", user);
        setLoginData(user);
        getDeviceInfo().then((deviceInfo) => {
          const docRef = doc(
            db,
            "users",
            user.email,
            "deviceInfo",
            deviceInfo.designName
          );
          const userDoc = {
            ...deviceInfo,
          };
          setDoc(docRef, userDoc)
            .then(() => {
              console.log("device info added successfully");
            })
            .catch((error) => {
              console.log(error);
            });
        });
        if (isConnected) {
          AsyncStorage.getItem("videoAnalytics")
            .then((jsonValue) => {
              const videoAnalytics =
                jsonValue != null ? JSON.parse(jsonValue) : null;
              // console.log("🚀 ~ file: Home.js:114 ~ videoAnalytics:", videoAnalytics);
              const docRef = doc(db, "videoAnalytics", user.email);
              const userDoc = {
                ...videoAnalytics,
              };
              setDoc(docRef, userDoc).then(() => {
                console.log("videoAnalytics added successfully");
              });
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          // Handle the case when there's no internet connection
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  getData();
  useEffect(() => {
    //readAPI()
    getUserLogin();
  }, []);

  function updateCurrentSlideIndex(e) {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / SIZES.width);
    setCurrentSlideIndex(currentIndex);
  }

  const unique = [...new Set(data.map((item) => item.class))]; // [ 'A', 'B']
  // console.log("🚀 ~ Home ~ unique:", unique);

  const sectionList = unique.filter((d) => !d.includes("Class"));

  const classList = unique.filter((d) => d.includes("Class"));
  function compareClasses(classObj1, classObj2) {
    const classNumber1 = parseInt(classObj1.split(" ")[1]);
    const classNumber2 = parseInt(classObj2.split(" ")[1]);
    return classNumber1 - classNumber2;
  }
  classList.sort(compareClasses);

  // console.log("🚀 ~ file: Home.js:101 ~ classList:", classList);

  const board = data.filter(function (course) {
    return course.board;
  });
  // console.log("🚀 ~ board ~ board:", board);
  const topRated = data.filter(function (course) {
    return course.topRated;
  });
  const popular = data.filter(function (course) {
    return course.popular;
  });

  // const newCategoryList = getUniqueListBy(filteredByClassArray, 'class');
  // // console.log('-------', JSON.stringify(newCategoryList));

  function renderDots() {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        {data.slice(0, 5).map((_, index) => {
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
        {data.length > 0 ? (
          <FlatList
            horizontal={true}
            index={4}
            data={data.slice(0, 5)}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={updateCurrentSlideIndex}
            contentContainerStyle={{ marginBottom: 16 }}
            renderItem={({ item, index }) => (
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
                key={index}
                onPress={() =>
                  navigation.navigate("CourseDetails", {
                    item: item,
                  })
                }
              >
                <ImageBackground
                  // source={item.image}
                  source={{ uri: `${item.image}` }}
                  style={{
                    width: SIZES.width - 40,
                    height: 220,
                    marginHorizontal: 10,
                  }}
                  imageStyle={{ borderRadius: 10 }}
                ></ImageBackground>
              </TouchableOpacity>
            )}
          />
        ) : (
          <FlatList
            data={onboardingSlide}
            ref={ref}
            onMomentumScrollEnd={updateCurrentSlideIndex}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            renderItem={({ item, index }) => {
              return (
                <View style={{ width: SIZES.width - 20 }} key={index}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: "LeagueSpartan_600SemiBold",
                      fontSize: 20,
                      textTransform: "capitalize",
                      marginBottom: 10,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      paddingHorizontal: 30,
                      ...FONTS.Lato_Regular,
                      fontSize: 16,
                      color: COLORS.lightBlack,
                      lineHeight: 16 * 1.7,
                    }}
                  >
                    {item.description}
                  </Text>
                </View>
              );
            }}
          />
        )}
        {/* {data.length > 0 && renderDots()} */}
        {renderDots()}
      </View>
    );
  }
  function renderHeader() {
    return (
      <View style={{ marginBottom: 30 }}>
        <View style={{ height: 10 }} />
        <Image
          source={require("../assets/images/background.png")}
          style={{
            position: "absolute",
            width: SIZES.width,
            height: "100%",
          }}
        />
        {/* {renderSearch()} */}
        {/* {data.length > 0 && renderPromo()} */}
        {renderPromo()}
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

  function renderBoard() {
    // const listOfBoard= board.map(item => item.board)
    // console.log("🚀 ~ renderBoard ~ listOfBoard:", listOfBoard);
    const uniqueBoard = [...new Set(board.map((item) => item.board))];
    // console.log("🚀 ~ renderBoard ~ uniqueBoard:", uniqueBoard);

    // let categoryList = [...new Set(board.map((item) => item.language))];
    // console.log("🚀 ~ renderBoard ~ categoryList:", categoryList);
    return (
      <View style={{ marginBottom: 30 }}>
        <CategoryComponent
          title={"Board List"}
          onPress={() =>
            navigation.navigate("BoardGrid", {
              boardName: uniqueBoard,
              board: board,
            })
          }
        />
        <FlatList
          data={uniqueBoard}
          horizontal={true}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("BoardCategoryGrid", {
                    title: item,
                    board: board,
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
                  source={require("../assets/images/categories/technology.png")}
                  imageStyle={{ borderRadius: 10 }}
                >
                  <Text
                    style={{
                      ...FONTS.Lato_700Bold,
                      color: COLORS.black,
                      lineHeight: 14 * 1.5,
                      fontSize: 14,
                    }}
                  >
                    {item}
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
    // let categoryList = [...new Set(board.map((item) => item.category))];
    // console.log("🚀 ~ renderBoard ~ categoryList:", categoryList);
    return (
      <View style={{ marginBottom: 30 }}>
        <CategoryComponent
          title={"Class List"}
          onPress={() =>
            navigation.navigate("ClassGrid", {
              className: classList,
              board: data,
            })
          }
        />
        {data.length > 0 ? (
          <FlatList
            data={classList}
            horizontal={true}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate("CategoryGrid", {
                      className: item,
                      data: data,
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
                    //source={item.image}
                    source={require("../assets/images/categories/technology.png")}
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
                      {item}
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              );
            }}
            contentContainerStyle={{ paddingLeft: 20 }}
            showsHorizontalScrollIndicator={false}
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

  function renderDynamicSection(listItem, index) {
    // console.log("🚀 ~ renderKids ~ item:", listItem);

    const listSection = data.filter(function (course) {
      return course.class == listItem;
    });
    // console.log("🚀 ~ listSection ~ listSection:", listSection);
    return (
      <View style={{ marginBottom: 20 }} key={index}>
        <CategoryComponent
          title={listItem}
          onPress={() =>
            navigation.navigate("TopRatedList", {
              name: listItem,
              listSection,
            })
          }
        />
        {data.length > 0 ? (
          <FlatList
            data={listSection}
            horizontal={true}
            keyExtractor={({ id, index }) => id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                // item.popular === true && (
                <HomeSectionComponent
                  item={item}
                  onPress={() =>
                    navigation.navigate("CourseDetails", {
                      item: item,
                    })
                  }
                />
                // )
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
      <View style={{ marginBottom: 20 }}>
        <CategoryComponent
          title={"Popular"}
          onPress={() =>
            navigation.navigate("TopRatedList", {
              name: "Recently Viewed",
              listSection: popular,
            })
          }
        />
        {data.length > 0 ? (
          <FlatList
            data={popular.slice(0, 5)}
            horizontal={true}
            keyExtractor={({ id }, index) => id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                item.popular === true && (
                  <HomeSectionComponent
                    key={item.id}
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
  function renderTopRated() {
    return (
      <View style={{ marginBottom: 20 }}>
        <CategoryComponent
          title={"New Additions"}
          onPress={() =>
            navigation.navigate("TopRatedList", {
              name: "New Additions",
              listSection: topRated,
            })
          }
        />
        {data.length > 0 ? (
          topRated.slice(0, 5).map((item, index, array) => {
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
            {flag ? createTwoButtonAlert() : ""}
          </Text>
        )}
      </View>
    );
  }
  const createTwoButtonAlert = () =>
    Alert.alert(
      "Alert",
      "Please connect to Satellite Receiver to view content",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => navigation.navigate("OnBoarding") },
      ]
    );

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
        {renderBoard()}
        {/* {renderClasses()} */}
        {/* {renderSkill()}
        {renderEducation()}
        {renderKids()} */}
        {sectionList.map((item, index) => {
          return renderDynamicSection(item, index);
        })}
        {renderTopRated()}
        {renderPopular()}
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

// function renderSkill() {
//   return (
//     <View style={{ marginBottom: 20 }}>
//       <CategoryComponent
//         title={"Skill Development"}
//         onPress={() =>
//           navigation.navigate("TopRatedList", {
//             name: "Skill Development",
//             skill,
//           })
//         }
//       />
//       {data.length > 0 ? (
//         <FlatList
//           data={skill}
//           horizontal={true}
//           keyExtractor={({ id }, index) => id}
//           showsHorizontalScrollIndicator={false}
//           renderItem={({ item, index }) => {
//             return (
//               item.popular === true && (
//                 <HomeSectionComponent
//                   item={item}
//                   onPress={() =>
//                     navigation.navigate("CourseDetails", {
//                       item: item,
//                     })
//                   }
//                 />
//               )
//             );
//           }}
//           contentContainerStyle={{ paddingLeft: 20 }}
//         />
//       ) : (
//         <Text
//           style={{
//             alignSelf: "center",
//             color: COLORS.lightGray,
//           }}
//         >
//           Disconnected
//         </Text>
//       )}
//     </View>
//   );
// }
// function renderEducation() {
//   return (
//     <View style={{ marginBottom: 20 }}>
//       <CategoryComponent
//         title={"Education"}
//         onPress={() =>
//           navigation.navigate("TopRatedList", {
//             name: "education",
//             education,
//           })
//         }
//       />
//       {data.length > 0 ? (
//         <FlatList
//           data={education}
//           horizontal={true}
//           keyExtractor={({ id }, index) => id}
//           showsHorizontalScrollIndicator={false}
//           renderItem={({ item, index }) => {
//             return (
//               item.popular === true && (
//                 <HomeSectionComponent
//                   item={item}
//                   onPress={() =>
//                     navigation.navigate("CourseDetails", {
//                       item: item,
//                     })
//                   }
//                 />
//               )
//             );
//           }}
//           contentContainerStyle={{ paddingLeft: 20 }}
//         />
//       ) : (
//         <Text
//           style={{
//             alignSelf: "center",
//             color: COLORS.lightGray,
//           }}
//         >
//           Disconnected
//         </Text>
//       )}
//     </View>
//   );
// }
