import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
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
import { Video, ResizeMode } from "expo-av";

export default function Player() {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;

  //   const FirstRoute = () => <DescriptionSectionComponent item={item} />;
  //   const SecondRoute = () => <LessonsSectionComponent item={item} />;
  const ThirdRoute = () => <InstructorSectionComponent item={item} />;
  const FourthRoute = () => <ReviewsSectionComponent item={item} />;

  const renderScene = SceneMap({
    // first: FirstRoute,
    // second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    // { key: "first", title: "Description" },
    // { key: "second", title: "Lessons" },
    { key: "third", title: "Instructor" },
    { key: "fourth", title: "Reviews" },
  ]);

  function renderHeader() {
    return (
      <ImageBackground
        style={{ height: 282, width: "100%" }}
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
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              alignItems: "flex-start",
              marginBottom: 17,
            }}
          >
            <Video
              style={styles.video}
              // resizeMode="contain"
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              source={{
                uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
              }}
              useNativeControls
            />
          </View>
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
