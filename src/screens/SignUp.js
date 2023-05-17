import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Header, InputField, Button } from "../components";
import { AndroidSafeArea, SIZES, FONTS, COLORS } from "../constants";
import { Check, Facebook, Google, Twitter, EyeOff } from "../svg";
import DropDownPicker from "react-native-dropdown-picker";
import { ScrollView } from "react-native-gesture-handler";

export default function SignUp({ navigation }) {
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
    return <Header title="Sign Up" onPress={() => navigation.goBack()} />;
  }

  function renderContent() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    console.log("value", value);
    const [items, setItems] = useState([
      { label: "Student", value: "student" },
      { label: "Teacher", value: "teacher" },
    ]);
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingTop: 6,
          paddingHorizontal: 20,
          flexGrow: 1,
          paddingBottom: 25,
        }}
      >
        <Image
          source={require("../assets/images/other/logo.png")}
          style={{
            width: 30,
            height: 30,
            alignSelf: "center",
            marginBottom: 10,
          }}
        />
        <Text
          style={{
            textAlign: "center",
            ...FONTS.H1,
            marginBottom: 10,
            lineHeight: 32 * 1.2,
            color: COLORS.black,
          }}
        >
          Sign up
        </Text>

        <View style={{ zIndex: 10, marginBottom: 10 }}>
          <DropDownPicker
            style={styles.dropdown}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>

        <InputField
          title="Name"
          placeholder="Kristin Watson"
          icon={
            <View style={{ padding: 20 }}>
              <Check />
            </View>
          }
          contaynerStyle={{ marginBottom: 10 }}
        />
        <InputField
          title="Email"
          placeholder="kristinwatson@mail.com"
          icon={
            <View style={{ padding: 20 }}>
              <Check />
            </View>
          }
          contaynerStyle={{ marginBottom: 10 }}
        />
        <InputField
          title="Password"
          placeholder="••••••••"
          icon={
            <TouchableOpacity style={{ padding: 20 }}>
              <EyeOff />
            </TouchableOpacity>
          }
          contaynerStyle={{ marginBottom: 10 }}
        />
        <InputField
          title="Confirm Password"
          placeholder="••••••••"
          icon={
            <TouchableOpacity style={{ padding: 20 }}>
              <EyeOff />
            </TouchableOpacity>
          }
          contaynerStyle={{ marginBottom: 35 }}
        />
        <Button
          title="sign up"
          containerStyle={{ marginBottom: 20 }}
          onPress={() => navigation.navigate("VerifyYourPhoneNumber")}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 38,
          }}
        >
          <Text
            style={{
              ...FONTS.Lato_400Regular,
              fontSize: 16,
              color: COLORS.lightBlack,
              lineHeight: 16 * 1.7,
            }}
          >
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text
              style={{
                ...FONTS.Lato_700Bold,
                fontSize: 16,
                color: COLORS.black,
                lineHeight: 16 * 1.7,
              }}
            >
              {" "}
              Sign in.
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity>
            <Facebook />
          </TouchableOpacity>

          <TouchableOpacity>
            <Twitter />
          </TouchableOpacity>
          <TouchableOpacity>
            <Google />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }

  return (
    <SafeAreaView style={{ ...AndroidSafeArea.AndroidSafeArea }}>
      {renderBackground()}

      {renderHeader()}
      {renderContent()}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  dropdownGender: {
    marginHorizontal: 10,
    width: "100%",
    marginBottom: 15,
  },
  dropdownCompany: {
    marginHorizontal: 10,
    marginBottom: 15,
  },
  dropdown: {
    borderColor: "#B7B7B7",
    height: 50,
    zIndex: 9,
    width: "100%",
    height: 60,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingLeft: 20,
    justifyContent: "center",
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
});
