import { View, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Header, CardComponent, CategoryComponent } from "../components";
import { AndroidSafeArea, COLORS, FONTS, courses } from "../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function TopRatedList({ route }) {
  const navigation = useNavigation();
  // console.log("==================route==================", route.params);
  const { topRated, popular, name, speciallyForYou, isNew } = route.params;
  console.log(name, "name");
  // const data = topRated ? topRated : popular;
  if (topRated) {
    var data = topRated;
  }
  if (popular) {
    var data = popular;
  }
  if (speciallyForYou) {
    var data = speciallyForYou;
  }
  if (isNew) {
    var data = isNew;
  }
  function renderTopRated() {
    return (
      <View style={{ marginBottom: 30 }}>
        <Header title={name} goBack={false} />

        {data.map((item, index, array) => {
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
        })}
      </View>
    );
  }
  return (
    <KeyboardAwareScrollView
      style={{
        marginBottom: 30,
        // flexGrow: 1,
        ...AndroidSafeArea.AndroidSafeArea,
      }}
    >
      {renderTopRated()}
    </KeyboardAwareScrollView>
  );
}
