import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

import { Header, ProfileCategoryComponent } from "../components";
import { AREA, COLORS, FONTS, SIZES } from "../constants";
import {
  Heart,
  Gift,
  CreditCard,
  HelpCircle,
  FileText,
  LogOut,
  Edit,
  ViewAll,
  UserTab,
  Star,
  Point,
  Plus,
} from "../svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export default function MyProfile() {
  const navigation = useNavigation();

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState("");
  console.log("🚀 ~ MyProfile ~ data:", data);

  const checkUserLogin = async () => {
    await AsyncStorage.getItem("userData")
      .then((jsonValue) => {
        const d = jsonValue != null ? JSON.parse(jsonValue) : null;
        console.log("🚀 ~ .then ~ d:", d);
        setData(d);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    checkUserLogin();
  }, []);

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
    return <Header title="My Profile" goBack={false} />;
  }

  function renderModal() {
    return (
      <Modal
        isVisible={showModal}
        onBackdropPress={setShowModal}
        hideModalContentWhileAnimating={true}
        backdropTransitionOutTiming={0}
        style={{ margin: 0 }}
        animationIn="zoomIn"
        animationOut="zoomOut"
      >
        <View
          style={{
            width: SIZES.width - 40,
            backgroundColor: COLORS.white,
            marginHorizontal: 20,
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingTop: 40,
            paddingBottom: 30,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              ...FONTS.H2,
              lineHeight: 20 * 1.5,
              marginBottom: 30,
              textTransform: "capitalize",
            }}
          >
            Are you sure you {"\n"} want to Sign Out ?
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: 130,
                height: 48,
                backgroundColor: COLORS.white,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 7.5,
                borderColor: COLORS.goldenTransparent_05,
                borderWidth: 1,
              }}
              onPress={() => {
                setShowModal(false);
                AsyncStorage.clear();
                navigation.navigate("SignIn");
              }}
            >
              <Text
                style={{
                  color: COLORS.mainColor,
                  ...FONTS.Lato_700Bold,
                  fontSize: 18,
                  textTransform: "capitalize",
                }}
              >
                Sure
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 130,
                height: 48,
                backgroundColor: COLORS.btnColor,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 7.5,
              }}
              onPress={() => setShowModal(false)}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.Lato_700Bold,
                  fontSize: 18,
                  textTransform: "capitalize",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  function renderContent() {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={() => navigation.navigate("ProfileEdit",{
          data:data
        })}>
          <ImageBackground
            source={require("../assets/images/user.png")}
            style={{
              width: 120,
              height: 120,
              alignSelf: "center",
              marginTop: 20,
              marginBottom: 20,
            }}
            imageStyle={{ borderRadius: 60 }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: COLORS.white,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                right: 0,
                bottom: -10,
              }}
            >
              <Plus />
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <Text
          style={{
            textAlign: "center",
            ...FONTS.H3,
            color: COLORS.black,
            lineHeight: 20 * 1.4,
          }}
        >
          {data ? data.username : ""}
        </Text>
        <Text
          style={{
            textAlign: "center",
            ...FONTS.Lato_400Regular,
            fontSize: 16,
            color: COLORS.black,
            lineHeight: 16 * 1.7,
            marginBottom: 20,
          }}
        >
          {data ? data.email : ""}
        </Text>
        <ProfileCategoryComponent
          title="Wishlist"
          icon={<Heart strokeColor={COLORS.mainColor} />}
          onPress={() => navigation.navigate("MyWishlist")}
          arrow={true}
          contaynerStyle={{ marginBottom: 5 }}
        />
        {/* <ProfileCategoryComponent
                    title="Coupons"
                    icon={<Gift />}
                    onPress={() => navigation.navigate("MyCoupons")}
                    arrow={true}
                    contaynerStyle={{ marginBottom: 5 }}
                />
                <ProfileCategoryComponent
                    title="Wallet"
                    icon={<CreditCard />}
                    onPress={() => navigation.navigate("MyWallet")}
                    arrow={true}
                    contaynerStyle={{ marginBottom: 5 }}
                /> */}
        <ProfileCategoryComponent
          title="Help & Support"
          icon={<HelpCircle />}
          onPress={() => navigation.navigate("HelpAndSupport")}
          arrow={true}
          contaynerStyle={{ marginBottom: 5 }}
        />
        <ProfileCategoryComponent
          title="Privacy Policy"
          icon={<FileText />}
          onPress={() => navigation.navigate("PrivacyPolicy")}
          arrow={true}
          contaynerStyle={{ marginBottom: 5 }}
        />
        <ProfileCategoryComponent
          title="Sign out"
          icon={<LogOut />}
          onPress={() => setShowModal(true)}
          contaynerStyle={{ marginBottom: 5 }}
        />
      </ScrollView>
    );
  }

  return (
    // <SafeAreaView style={{ flex: 1, ...AREA.AndroidSafeArea }}>
     <SafeAreaView  style={{ flex: 1}}>
      {renderBackground()}
      {renderHeader()}
      {renderContent()}
      {renderModal()}
    </SafeAreaView>
  );
}
