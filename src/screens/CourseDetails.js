import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar,
  Image,
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
} from "../components";
import Quiz from "../components/QuizsectionComponent";

export default function CourseDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;

  const FirstRoute = () => <DescriptionSectionComponent item={item} />;
  const SecondRoute = () => <LessonsSectionComponent item={item} />;
  const ThirdRoute = () => <InstructorSectionComponent item={item} />;
  // const FourthRoute = () => <ReviewsSectionComponent item={item} />;
  const FifthRoute = () => <Quiz item={item} />;

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    // fourth: FourthRoute,
    Fifth: FifthRoute,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Description" },
    { key: "second", title: "Lessons" },
    { key: "third", title: "Instructor" },
    // { key: "fourth", title: "Reviews" },
    { key: "Fifth", title: "Quiz" },
  ]);

  function renderHeader() {
    return (
      <ImageBackground
        style={{ height: "auto", width: "100%" }}
        source={require("../assets/images/background/background-02.png")}
      >
        <View
          style={{
            paddingTop: 44,
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 17,
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowWhite />
            </TouchableOpacity>
            <TouchableOpacity>
              <Heart strokeColor={COLORS.white} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center",justifyContent: "space-between",}}>
          <View style={{ flexDirection: "row", alignItems: "center",justifyContent: "space-between",}}>
          <Text
              style={{
                ...FONTS.Lato_700Bold,
                fontSize: 10,
                color: "#FFC700",
                marginRight: 3,
                lineHeight: 10 * 1.7,
              }}
            >
              {item.rating}
            </Text>
            <Rating />
          </View>
            
            <View>
            <Text
              style={{
                ...FONTS.Lato_700Bold,
                fontSize: 14,
                color: "#000",
                marginRight: 3,
                lineHeight: 10 * 1.7,
              }}
            >
              {item.class}
            </Text>
            </View>
          </View>
         
          <Text
            style={{
              ...FONTS.H4,
              color: COLORS.white,
              lineHeight: 18 * 1.5,
              marginBottom: 10,
            }}
            numberOfLines={2}
          >
            {item.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            <Reload />
            <Text
              style={{
                ...FONTS.Lato_400Regular,
                fontSize: 10,
                color: COLORS.white,
                marginLeft: 6,
                lineHeight: 10 * 1.7,
              }}
            >
              Last Update Apr. 5, 2022{" "}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            <Book />
            <Text
              style={{
                ...FONTS.Lato_400Regular,
                fontSize: 10,
                color: COLORS.white,
                marginLeft: 6,
                lineHeight: 10 * 1.7,
              }}
            >
              {item.lectures} Lectures
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <CourseUser />
            <Text
              style={{
                ...FONTS.Lato_400Regular,
                fontSize: 10,
                color: COLORS.white,
                marginLeft: 6,
                lineHeight: 10 * 1.7,
              }}
            >
              {item.author}
            </Text>
          </View>
          {/* <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Text
              style={{
                ...FONTS.Lato_700Bold,
                fontSize: 20,
                color: COLORS.white,
                marginRight: 4,
              }}
            >
              ${item.price}
            </Text>
            {item.oldPrice && (
              <Text
                style={{
                  textDecorationLine: "line-through",
                  color: COLORS.white,
                  fontSize: 12,
                }}
              >
                ${item.oldPrice}
              </Text>
            )}
          </View> */}
        </View>
        {/* <Video
                    source={{ uri: "background" }} // Can be a URL or a local file.
                    ref={(ref) => {
                        this.player = ref;
                    }} // Store reference
                    onBuffer={this.onBuffer} // Callback when remote video is buffering
                    onError={this.videoError} // Callback when video cannot be loaded
                    style={styles.backgroundVideo}
                /> */}
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
      {renderTabView()}
    </View>
  );
}
