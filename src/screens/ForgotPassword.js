import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { Header, InputField, Button } from "../components";
import { AREA, COLORS, FONTS, SIZES } from "../constants";
import { Controller, useForm } from "react-hook-form";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { async } from "@firebase/util";

export default function ForgotPassword() {
  const navigation = useNavigation();

  function renderHeader() {
    return (
      <Header title="Forgot password" onPress={() => navigation.goBack()} />
    );
  }

  function renderContent() {
    const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const [hidePass, setHidePass] = useState(true);
    const [error, setError] = useState(null);

    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({});
    // console.log("🚀 ~ renderContent ~ errors:", errors);

    const onForgotForm = async (data) => {
      console.log("🚀 ~ onForgotForm ~ data:", data);
      const email=data.email
      const auth = getAuth();

      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          // ..
        })
        .catch((error) => {
          if (error.code === 'auth/user-not-found') {
            setError('User not found');
          } else {
            setError('There was a problem with your request');
          }
        });
    };
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingTop: 30,
          paddingHorizontal: 20,
          flexGrow: 1,
        }}
      >
        <Text
          style={{
            marginBottom: 20,
            ...FONTS.BodyText,
            color: COLORS.lightBlack,
          }}
        >
          Please enter your email address. You will receive a link to create a
          new password via email.
        </Text>
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
        <Button
          title="Send"
          //   onPress={() => navigation.navigate("ResetPassword")}
          onPress={handleSubmit(onForgotForm)}
        />
      </KeyboardAwareScrollView>
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

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      {renderBackground()}
      {renderHeader()}
      {renderContent()}
    </SafeAreaView>
  );
}
