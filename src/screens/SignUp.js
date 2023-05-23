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
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updatePhoneNumber } from "firebase/auth";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function SignUp({ route,navigation }) {
  const { phoneNumber } = route.params;
  console.log("phoneNumber===>", phoneNumber);
  function renderBackground() {
    return (
      <Image
        source={require("../assets/images/background/background-01.png")}
        style={{
          position: "absolute",
          width: SIZES.width,
          height: SIZES.height + SIZES.height / 2,
          resizeMode: "stretch",
        }}
      />
    );
  }

  function renderHeader() {
    return <Header title="Sign Up" onPress={() => navigation.goBack()} />;
  }

  function renderContent() {
    const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    const [open, setOpen] = useState(false);
    const [openClass, setOpenClass] = useState(false);
    const [value, setValue] = useState(null);
    const [hidePass, setHidePass] = useState(true);

    const [items, setItems] = useState([
      { label: "Student", value: "student" },
      { label: "Teacher", value: "teacher" },
    ]);
    const [classItems, setClassItems] = useState([
      {
        label: "Class 1",
        value: "class1",
      },
      { label: "Class 2", value: "class2" },
      { label: "Class 3", value: "class3" },
      { label: "Class 4", value: "class4" },
      { label: "Class 5", value: "class5" },
      { label: "Class 6", value: "class6" },
      { label: "Class 7", value: "class7" },
      { label: "Class 8", value: "class8" },
      { label: "Class 9", value: "class9" },
      { label: "Class 10", value: "class10" },
      
    ]);
    const {
      control,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm({
      defaultValues: {
        phoneNumber: phoneNumber,
      },
    });

    console.log(errors);
    console.log("🚀 ~ renderContent ~ errors:", errors);
    
    const pwd = watch("password");
    const role = watch("role");
    const onSignUpForm = (data) => {
      console.log("🚀 ~ onSignUpForm ~ data:", data);
    };
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
          <Controller
            control={control}
            name="role"
            rules={{
              required: "Role is required",
            }}
            render={({ field, error }) => (
              <>
                <DropDownPicker
                  style={styles.dropdown}
                  open={open}
                  // value={value}
                  value={field.value}
                  setValue={(callback) => field.onChange(callback())}
                  items={items}
                  setOpen={setOpen}
                  // setValue={setValue}
                  setItems={setItems}
                  dropDownContainerStyle={{
                    backgroundColor: "grey",
                  }}
                  selectedItemContainerStyle={{
                    backgroundColor: "grey",
                  }}
                />
                {errors.role && (
                  <Text
                    style={{
                      ...FONTS.LeagueSpartan_400Regular,
                      fontSize: 12,
                      color: "red",
                      marginLeft: 10,
                      zIndex: -11,
                    }}
                  >
                    {errors.role.message || "Error"}
                  </Text>
                )}
              </>
            )}
          />
        </View>
        <Controller
          control={control}
          name="schoolName"
          rules={{
            required: "School Name is required",
            minLength: {
              value: 3,
              message: "School Name should be at least 3 characters long",
            },
            maxLength: {
              value: 20,
              message: "School Name should be max 23 characters long",
            },
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: "Enter characters only",
            },
          }}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <InputField
              title="School Name"
              placeholder="xyz"
              contaynerStyle={{ marginBottom: 10 }}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={error}
            />
          )}
        />
        {role == "student" && (
          <View style={{ zIndex: 10, marginBottom: 10 }}>
            <Controller
              control={control}
              name="class"
              rules={{
                required: "Role is required",
              }}
              render={({ field, error }) => (
                <>
                  <DropDownPicker
                    style={styles.dropdown}
                    open={openClass}
                    // value={value}
                    value={field.value}
                    setValue={(callback) => field.onChange(callback())}
                    items={classItems}
                    setOpen={setOpenClass}
                    // setValue={setValue}
                    setItems={setClassItems}
                    dropDownContainerStyle={{
                      backgroundColor: "grey",
                    }}
                    selectedItemContainerStyle={{
                      backgroundColor: "grey",
                    }}
                  />
                  {errors.role && (
                    <Text
                      style={{
                        ...FONTS.LeagueSpartan_400Regular,
                        fontSize: 12,
                        color: "red",
                        marginLeft: 10,
                        zIndex: -11,
                      }}
                    >
                      {errors.role.message || "Error"}
                    </Text>
                  )}
                </>
              )}
            />
          </View>
        )}

        <Controller
          control={control}
          name="username"
          rules={{
            required: "UserName is required",
            minLength: {
              value: 3,
              message: "UserName should be at least 3 characters long",
            },
            maxLength: {
              value: 20,
              message: "UserName should be max 23 characters long",
            },
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: "Enter characters only",
            },
          }}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <InputField
              title="UserName"
              placeholder="test"
              contaynerStyle={{ marginBottom: 10 }}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={error}
            />
          )}
        />
        <Controller
          control={control}
          name="phoneNumber"
          render={({}) => (
            <InputField
              title="Phone Number"
              placeholder={`${phoneNumber}`}
              contaynerStyle={{
                marginBottom: 10,
              }}
              value={`${phoneNumber}`}
              selectTextOnFocus={false}
              editable={false}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",

            pattern: {
              value: EMAIL_REGEX,
              message: "Email is invalid",
            },
          }}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <InputField
              title="Email"
              placeholder="abc@gmail.com"
              contaynerStyle={{ marginBottom: 10 }}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={error}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 3,
              message: "Password should be minimum 3 characters long",
            },
            maxLength: {
              value: 20,
              message: "Password should be max 16 characters long",
            },
          }}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <InputField
              title="Password"
              placeholder="••••••••"
              contaynerStyle={{ marginBottom: 10 }}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry={hidePass ? true : false}
              error={error}
              icon={
                <TouchableOpacity
                  style={{ padding: 20 }}
                  onPress={() => setHidePass(!hidePass)}
                >
                  {!hidePass ? <EyeOff /> : <EyeOff />}
                </TouchableOpacity>
              }
            />
          )}
        />
        <Controller
          control={control}
          name="password-repeat"
          rules={{
            validate: (value) => value === pwd || "Password not match",
          }}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <InputField
              title="Confirm Password"
              placeholder="••••••••"
              contaynerStyle={{ marginBottom: 10 }}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry
              error={error}
            />
          )}
        />
        {/* <InputField
          title="Password"
          placeholder="••••••••"
          icon={
            <TouchableOpacity style={{ padding: 20 }}>
              <EyeOff />
            </TouchableOpacity>
          }
          contaynerStyle={{ marginBottom: 10 }}
        /> */}

        {/* <InputField
          title="Confirm Password"
          placeholder="••••••••"
          icon={
            <TouchableOpacity style={{ padding: 20 }}>
              <EyeOff />
            </TouchableOpacity>
          }
          contaynerStyle={{ marginBottom: 35 }}
        /> */}
        {/* <Button
            title="sign up"
            containerStyle={{ marginBottom: 20 }}
            onPress={() => navigation.navigate("VerifyYourPhoneNumber")}
          /> */}
        <Button
          title="sign up"
          type="submit"
          containerStyle={{ marginBottom: 20 }}
          onPress={handleSubmit(onSignUpForm)}
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
    elevation: 3,
  },
  dropdownCompany: {
    marginHorizontal: 10,
    marginBottom: 15,
    elevation: 3,
  },
  dropdown: {
    borderColor: "#B7B7B7",
    height: 50,
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
