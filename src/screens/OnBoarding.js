import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  SIZES,
  FONTS,
  COLORS,
  onboardingSlide,
  AndroidSafeArea,
} from "../constants";
import { Button } from "../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import { fetchOtt } from "../Slice/OttSlice";

export default function OnBoarding() {
  const navigation = useNavigation();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef();

  const dispatch = useDispatch();
  dispatch(fetchOtt());

  function updateCurrentSlideIndex(e) {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / SIZES.width);
    setCurrentSlideIndex(currentIndex);
  }

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != onboardingSlide.length) {
      const offset = nextSlideIndex * SIZES.width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  function renderBackground() {
    return (
      <Image
        source={require("../assets/images/background/background-03.png")}
        style={{
          position: "absolute",
          width: SIZES.width,
          height: SIZES.height + SIZES.height / 2,
          resizeMode: "stretch",
          zIndex: -1,
        }}
      />
    );
  }

  function renderDots() {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          marginBottom: SIZES.height / 20,
        }}
      >
        {onboardingSlide.map((_, index) => {
          return (
            <View
              key={index}
              style={[
                styles.dot,
                currentSlideIndex == index && {
                  width: 25,
                  backgroundColor: COLORS.black,
                },
              ]}
            />
          );
        })}
      </View>
    );
  }

  function renderHeader() {
    return (
      <View style={{ height: 50, width: "100%", paddingHorizontal: 20 }}>
        {currentSlideIndex !== onboardingSlide.length - 1 && (
          <TouchableOpacity
            style={{
              height: "100%",
              justifyContent: "center",
              alignItems: "flex-end",
              zIndex: 999,
              alignSelf: "flex-end",
            }}
            onPress={() => navigation.navigate("MainLayout")}
          >
            <Text>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  function renderFlatList() {
    return (
      <FlatList
        data={onboardingSlide}
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        renderItem={({ item, index }) => {
          return (
            <View style={{ width: SIZES.width }}>
              {/* <Image
                source={item.image}
                style={{
                  width: "100%",
                  height: SIZES.height / 2.7,
                  marginBottom: SIZES.height / 60,
                }}
              /> */}

              <Image
                source={item.image}
                resizeMode='contain'
                style={{
                  width: "100%",
                  height: SIZES.height / 2.7,
                  marginBottom: SIZES.height / 20,
                }}
              />
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
    );
  }

  function renderButton() {
    return (
      <Button
        title={
          currentSlideIndex !== onboardingSlide.length - 1
            ? "Next"
            : "Get started"
        }
        containerStyle={{
          marginHorizontal: 20,
          marginBottom: SIZES.height / 25,
        }}
        onPress={
          currentSlideIndex == onboardingSlide.length - 1
            ? () => navigation.navigate("MainLayout")
            : goToNextSlide
        }
      />
    );
  }

  return (
    <SafeAreaView style={{ ...AndroidSafeArea.AndroidSafeArea }}>
      {renderHeader()}
      {renderBackground()}
      {renderFlatList()}
      {renderDots()}
      {renderButton()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 2,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: COLORS.gray,
  },
});
