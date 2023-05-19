import { View, Text, Image, SafeAreaView, StyleSheet, TextInput } from "react-native";
import React, { useRef, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PhoneInput from "react-native-phone-input";
import { useNavigation } from "@react-navigation/native";

import { SIZES, AndroidSafeArea, FONTS, COLORS } from "../constants";
import { Header, Button } from "../components";
import { getApp, initializeApp } from "firebase/app";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import fbConfig from "../../config/firebase";

export default function VerifyYourPhoneNumber() {
  const navigation = useNavigation();

  try {
    firebase.initializeApp(fbConfig);
  } catch (error) {
    console.log("Initializing error ", error);
  }
  const app = getApp();
  console.log("app ==============>",app);
  const auth = getAuth(app);

  if (!app?.options || Platform.OS === "web") {
    throw new Error(
      "This example only works on Android or iOS, and requires a valid Firebase config."
    );
  }

  const recaptchaVerifier = useRef(null);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationID] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const firebaseConfig = app ? app.options : undefined;
  const [info, setInfo] = useState("");
  const attemptInvisibleVerification = false;
  const handleSendVerificationCode = async () => {
    try {
      const phoneProvider = new PhoneAuthProvider(auth); // initialize the phone provider.
      console.log("phoneProvider",phoneProvider);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      ); // get the verification id
      console.log("verificationId",verificationId);

      setVerificationID(verificationId); // set the verification id
      setInfo("Success : Verification code has been sent to your phone"); // If Ok, show message.
    } catch (error) {
      setInfo(`Error : ${error.message}`); // show the error
    }
  };
  const handleVerifyVerificationCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      ); // get the credential
      await signInWithCredential(auth, credential); // verify the credential
      setInfo("Success: Phone authentication successful"); // if OK, set the message
      navigation.navigate("SignUp"); // navigate to the welcome screen
    } catch (error) {
      setInfo(`Error : ${error.message}`); // show the error.
    }
  };
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
    return (
      <Header
        title="Verify your phone number"
        onPress={() => navigation.goBack()}
      />
    );
  }

  function renderContent() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingTop: 30,
          paddingHorizontal: 20,
          flexGrow: 1,
          paddingBottom: 25,
        }}
      >
        <Text
          style={{
            ...FONTS.BodyText,
            color: COLORS.bodyTextColor,
            marginBottom: 20,
          }}
        >
          We have sent you an SMS with a code to number +17 0123456789.
        </Text>
        <View
          style={{
            marginBottom: 20,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingVertical: 8,
          }}
        >
          <Text
            style={{
              ...FONTS.Spartan_400Regular,
              fontSize: 12,
              textTransform: "capitalize",
              lineHeight: 12 * 1.7,
              marginBottom: 3,
              color: COLORS.secondaryTextColor,
            }}
          >
            phone number
          </Text>
          <PhoneInput
            style={{
              fontSize: 14,
              // fontFamily: FONTS.Spartan_400Regular,
              paddingBottom: 4,
            }}
            placeholderTextColor={COLORS.bodyTextColor}
            initialCountry={"in"}
          />
        </View>
        <Button
          title="confirm"
          onPress={() => navigation.navigate("ConfirmationCode")}
        />
      </KeyboardAwareScrollView>
    );
  }

  return (
    <SafeAreaView style={{ ...AndroidSafeArea.AndroidSafeArea }}>
      {renderBackground()}
      {renderHeader()}
      {renderContent()}
      <View style={styles.container}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />

        {info && <Text style={styles.text}>{info}</Text>}

        {
          // show the phone number input field when verification id is not set.
          !verificationId && (
            <View>
              <Text style={styles.text}>Enter the phone number</Text>

              <TextInput
                placeholder="+2547000000"
                autoFocus
                autoCompleteType="tel"
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
              />

              <Button
                onPress={() => handleSendVerificationCode()}
                title="Send Verification Code"
                disabled={!phoneNumber}
              />
            </View>
          )
        }

        {
          // if verification id exists show the confirm code input field.
          verificationId && (
            <View>
              <Text style={styles.text}>Enter the verification code</Text>

              <TextInput
                editable={!!verificationId}
                placeholder="123456"
                onChangeText={setVerificationCode}
              />

              <Button
                title="Confirm Verification Code"
                disabled={!verificationCode}
                onPress={() => handleVerifyVerificationCode()}
              />
            </View>
          )
        }

        {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    text:{
        color: "#aaa"
    },
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
    })