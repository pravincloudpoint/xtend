import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { Header, InputField, Button } from "../components";
import { AREA, COLORS, FONTS, SIZES } from "../constants";
import { Check, EyeOff, CheckSmall, Facebook, Twitter, Google } from "../svg";
import { Controller, useForm } from "react-hook-form";
import { db } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ResizeMode, Video } from "expo-av";
export default function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [video, setVideo] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {});
  const loginData = { title: "test" };
  const getUserInfo = async () => {
    const doc = addDoc(collection(db, "user"), loginData);
    console.log("🚀 ~ getUserInfo ~ doc:", doc);
  };
  const [state, setState] = useState("");

  const storagePath = `${FileSystem.documentDirectory}`;
  const [info, setInfo] = useState("");
  const resume = async () => {
    // try {
    //   const { uri } = await downloadResumable.resumeAsync();
    //   console.log("Finished downloading to ", uri);
    // } catch (e) {
    //   console.error(e);
    // }

    const { exists, isDirectory, uri } = await FileSystem.getInfoAsync(
      storagePath
    );
    console.log(
      "exists: " + exists + " isDirectory: " + isDirectory + " uri: " + uri
    );
    FileSystem.readAsStringAsync(FileSystem.documentDirectory + "small.mp4")
      .then((info) => setInfo(info.toString()))
      .catch((error) => {
        console.log("🚀 ~ resume ~ error:", error);
      });
  };
  const callback = (downloadProgress) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setState({
      downloadProgress: progress,
    });
  };
  const downloadResumable = FileSystem.createDownloadResumable(
    "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    FileSystem.documentDirectory + "pravin.mp4",
    {},
    callback
  );
  const infoFile = async () => {
    try {
      // const infoFile = await FileSystem.getInfoAsync(storagePath);;
      // console.log("Finished info to ", infoFile.uri);

      const data = FileSystem.readDirectoryAsync(storagePath);
      data
        .then((data) => {
          console.log("🚀 ~ infoFile ~ data:", data);
          setVideo(data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    } catch (e) {
      console.error(e);
    }
  };
  const download = async () => {
    try {
      const { uri } = await downloadResumable.downloadAsync();
      console.log("Finished downloading to ", uri);
    } catch (e) {
      console.error(e);
    }
  };

const fileName="bunny.mp4";
const downloadVideo = async () => {
  //const videoUrl="http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4";
  const videoUrl="http://192.168.30.1/frm/ui/cat/frmpackage/64755a0eda055/content/CLASS 10 GEOGRAPHY - RESOURCES AND DEVELOPMENT.mp4";
  const fileUri = FileSystem.documentDirectory + fileName;

  try {
    const { uri } = await FileSystem.downloadAsync(videoUrl, fileUri);
    console.log('Video downloaded to:', uri);
  } catch (error) {
    console.error('Failed to download video:', error);
  }
};

  const deleteFile = async () => {
    try {
      console.log("deleteFile ===>");
      await FileSystem.deleteAsync(
        `file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540pravin1desh%252Fextend/${fileName}`
      );
      console.log("deleteAsync ===>");
      // const size=await FileSystem.getFreeDiskStorageAsync()
      // const totalSize= await FileSystem.getTotalDiskCapacityAsync()
      // console.log("🚀 ~ deleteFile ~ totalSize:",JSON.stringify(totalSize));
      // console.log("🚀 ~ deleteFile ~ size:", size);
    } catch (e) {
      console.error(e);
    }
  };
  const downloadSnapshotJson = async () => {
    //To resume a download across app restarts, assuming the DownloadResumable.savable() object was stored:
    const downloadSnapshotJson = await AsyncStorage.getItem("pausedDownload");
    const downloadSnapshot = JSON.parse(downloadSnapshotJson);
    const downloadResumable = new FileSystem.DownloadResumable(
      downloadSnapshot.url,
      downloadSnapshot.fileUri,
      downloadSnapshot.options,
      callback,
      downloadSnapshot.resumeData
    );

    try {
      const { uri } = await downloadResumable.resumeAsync();
      console.log("Finished downloading to ", uri);
    } catch (e) {
      console.error(e);
    }
  };
  const pause = async () => {
    try {
      await downloadResumable.pauseAsync();
      console.log("Paused download operation, saving for future retrieval");
      AsyncStorage.setItem(
        "pausedDownload",
        JSON.stringify(downloadResumable.savable())
      );
    } catch (e) {
      console.error(e);
    }
  };

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
    return <Header title="Sign In" onPress={() => navigation.goBack()} />;
  }

  function renderContent() {
    const EMAIL_REGEX = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;
    const [hidePass, setHidePass] = useState(true);

    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({});
    //console.log("🚀 ~ renderContent ~ errors:", errors);
    const onSignInForm = (loginData) => {
      //  console.log("🚀 ~ onSignUpForm ~ data:", loginData);
      const doc = addDoc(collection(db, "user"), loginData);
      //console.log("🚀 ~ getUserInfo ~ doc:", doc);
    };
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingTop: 36,
          paddingHorizontal: 20,
          flexGrow: 1,
        }}
      >
        <Image
          source={require("../assets/images/other/logo.png")}
          style={{
            width: 30,
            height: 30,
            alignSelf: "center",
            marginBottom: 20,
          }}
        />
        <Text
          style={{
            textAlign: "center",
            ...FONTS.H1,
            marginBottom: 14,
            lineHeight: 32 * 1.2,
            color: COLORS.black,
          }}
        >
          Welcome Back!
        </Text>
        <Text
          style={{
            textAlign: "center",
            ...FONTS.Lato_Regular,
            fontSize: 18,
            color: COLORS.black,
            lineHeight: 18 * 1.7,
            marginBottom: 26,
          }}
        >
          Sign in to continue
        </Text>
        {/* <InputField
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
                        <View style={{ padding: 20 }}>
                            <EyeOff />
                        </View>
                    }
                    contaynerStyle={{ marginBottom: 16 }}
                /> */}
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View
              style={{
                width: 16,
                height: 16,
                borderWidth: 1,
                borderRadius: 4,
                marginRight: 8,
                borderColor: COLORS.lightBlack,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {rememberMe && <CheckSmall />}
            </View>
            <Text>Remember me</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text
              style={{
                ...FONTS.Lato_700Bold,
                fontSize: 16,
                color: COLORS.black,
              }}
            >
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          title="Sign in"
          containerStyle={{ marginBottom: 20 }}
          //   onPress={() => navigation.navigate("MainLayout")}
          onPress={handleSubmit(onSignInForm)}
        />
        <Button
          title="getUserInfo"
          containerStyle={{ marginBottom: 20 }}
          onPress={getUserInfo}
        />

        <Button
          title="download"
          containerStyle={{ marginBottom: 20 }}
          onPress={() => downloadVideo()}
        ></Button>
        <Button
          title="pause"
          containerStyle={{ marginBottom: 20 }}
          onPress={() => pause()}
        ></Button>
        <Button
          title="resume"
          containerStyle={{ marginBottom: 20 }}
          onPress={() => resume()}
        ></Button>
        <Button
          title="downloadSnapshotJson"
          containerStyle={{ marginBottom: 20 }}
          onPress={() => downloadSnapshotJson()}
        ></Button>
        <Button
          title="deleteFile"
          containerStyle={{ marginBottom: 20 }}
          onPress={() => deleteFile()}
        ></Button>
        <Button
          title="Info File"
          containerStyle={{ marginBottom: 20 }}
          onPress={() => infoFile()}
        ></Button>

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
            Don’t have an account?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("VerifyYourPhoneNumber")}
          >
            <Text
              style={{
                ...FONTS.Lato_700Bold,
                fontSize: 16,
                color: COLORS.black,
                lineHeight: 16 * 1.7,
              }}
            >
              Sign up.
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
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      {renderBackground()}
      {renderHeader()}
      {renderContent()}
      {video.map((item, index, array) => {
        const lastIndex = array.length - 1;
        return (
          <View
            key={index}
            style={{
              marginHorizontal: 20,
            }}
          >
           <TouchableOpacity
            onPress={() => navigation.navigate("Player",{item,storagePath})}
            
          >
            <Text
              style={{
                ...FONTS.Lato_700Bold,
                fontSize: 16,
                color: COLORS.black,
                lineHeight: 16 * 1.7,
              }}
            >
           {item}
            </Text>
          </TouchableOpacity>
          </View>
        );
      })}
      {/* <Video
        style={styles.video}
        // resizeMode="contain"
        resizeMode={ResizeMode.CONTAIN}
        // resizeMode="contain"
        isLooping
        source={{
          uri: "file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540abhikale7%252Fextend/big_buck.mp4",
        }}
        useNativeControls
      /> */}
    </SafeAreaView>
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
