/* eslint-disable react-hooks/rules-of-hooks */
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  TextInput,
  FlatList,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Header, InputField, Button } from "../components";
import { AndroidSafeArea, SIZES, FONTS, COLORS } from "../constants";
import {
  Check,
  Facebook,
  Google,
  Twitter,
  EyeOff,
  EmailSvg,
  Username,
} from "../svg";
import DropDownPicker from "react-native-dropdown-picker";
import { ScrollView } from "react-native-gesture-handler";
import { Controller, useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  updatePhoneNumber,
} from "firebase/auth";
import EyeOn from "../svg/EyeOn";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { format } from "date-fns";
import { useRoute } from "@react-navigation/native";

const countries = [
  { country: "Afghanistan", code: "93", iso: "AF" },
  { country: "Albania", code: "355", iso: "AL" },
  { country: "Algeria", code: "213", iso: "DZ" },
  { country: "American Samoa", code: "1-684", iso: "AS" },
  { country: "Andorra", code: "376", iso: "AD" },
  { country: "Angola", code: "244", iso: "AO" },
  { country: "Anguilla", code: "1-264", iso: "AI" },
  { country: "Antarctica", code: "672", iso: "AQ" },
  { country: "Antigua and Barbuda", code: "1-268", iso: "AG" },
  { country: "Argentina", code: "54", iso: "AR" },
  { country: "Armenia", code: "374", iso: "AM" },
  { country: "Aruba", code: "297", iso: "AW" },
  { country: "Australia", code: "61", iso: "AU" },
  { country: "Austria", code: "43", iso: "AT" },
  { country: "Azerbaijan", code: "994", iso: "AZ" },
  { country: "Comoros", code: "269", iso: "KM" },
  { country: "Cook Islands", code: "682", iso: "CK" },
  { country: "Lebanon", code: "961", iso: "LB" },
  { country: "Lesotho", code: "266", iso: "LS" },
  { country: "Liberia", code: "231", iso: "LR" },
  { country: "Libya", code: "218", iso: "LY" },
  { country: "Liechtenstein", code: "423", iso: "LI" },
  { country: "Lithuania", code: "370", iso: "LT" },
  { country: "Niue", code: "683", iso: "NU" },
];
export default function SignUp({navigation }) {
  const route = useRoute();
  const {phoneNumber, location } = route.params;
  console.log("phoneNumber===>", phoneNumber);
 console.log("location===>", typeof location);
 const locationData = location[0]; // Assuming there's only one object in the array

 const postalCode = locationData.postalCode;
 const country = locationData.country;
 const isoCountryCode = locationData.isoCountryCode;
 const subregion = locationData.subregion;
 const city = locationData.city;
 const street = locationData.street;
 const district = locationData.district;
 const name = locationData.name;
 const streetNumber = locationData.streetNumber;
 const region = locationData.region;
 const timezone = locationData.timezone;

// const phoneNumber="0000000";
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
  const [schoolsList, setSchoolsList] = useState();
   console.log("🚀 ~ file: SignUp.js:89 ~ schoolsList:", schoolsList);

  const getSchoolsList = async () => {
    const usersCollection = collection(db, "schools");
    const userQuery = query(
      usersCollection,
      where("state", "==", region),
      where("city", "==", city),
    );
    const querySnapshot = await getDocs(userQuery);
    items = [];
    querySnapshot?.forEach(async (doc) => {
      //  console.log("doc data()",doc.data());
      items.push(doc.data());
    });
    setSchoolsList(items);
  };

  useEffect(() => {
    getSchoolsList();
  }, []);

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
        value: "Class 1",
      },
      { label: "Class 2", value: "Class 2" },
      { label: "Class 3", value: "Class 3" },
      { label: "Class 4", value: "Class 4" },
      { label: "Class 5", value: "Class 5" },
      { label: "Class 6", value: "Class 6" },
      { label: "Class 7", value: "Class 7" },
      { label: "Class 8", value: "Class 8" },
      { label: "Class 9", value: "Class 9" },
      { label: "Class 10", value: "Class 10" },
    ]);

    const [search, setSearch] = useState("");
    const [clicked, setClicked] = useState(false);
    const [data, setData] = useState(countries);
    const [selectedSchoolName, setSelectedSchoolName] = useState("");
    const searchRef = useRef();
    const onSearch = (search) => {
      console.log("🚀 ~ file: SignUp.js:151 ~ search:", search);
      if (search !== "") {
        let tempData = schoolsList.filter((item) => {
          console.log("🚀 ~ file: SignUp.js:154 ~ item:", item);
          return (
            item.schoolName.toLowerCase().indexOf(search.toLowerCase()) > -1
          );
        });
        setData(tempData);
      } else {
        setData(schoolsList);
      }
    };

    //chip
    const [classList, setClassList] = useState("");
    const [clicked1, setClicked1] = useState(false);

    const {
      control,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm({
      defaultValues: {
        phoneNumber: phoneNumber,
        // schoolName: selectedSchoolName,
        // class: classList,
      },
    });

    console.log(errors);
    console.log("🚀 ~ renderContent ~ errors:", errors);

    const pwd = watch("password");
    const role = watch("role");
    // const nameSchool = watch("schoolName");

    const onSignUpForm = async (data) => {
      console.log("🚀 ~ file: SignUp.js:189 ~ data:", data);
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        const user = userCredential.user;
        console.log("User sign-up successful:", user.uid);
        try {
          const docRef = doc(db, "users", user.email);

          const userDoc = {
            ...data,
            schoolName: selectedSchoolName,
            phoneNumber: phoneNumber,
            class: classList,
            location:locationData,
            createAt: format(new Date(), "dd-MM-yyyy hh:mm:ss"),
          };
          console.log("🚀 ~ file: SignUp.js:202 ~ userDoc:", userDoc);

          setDoc(docRef, userDoc)
            .then(() => {
              console.log("Document has been added successfully");
            })
            .catch((error) => {
              console.log(error);
            });

          await AsyncStorage.setItem("email", user.email).then(() => {
            console.log("success to set email");
            navigation.navigate("MainLayout");
          });

          const userData= {
            ...data,
            ...locationData
          }
          const jsonValue = JSON.stringify(userData);
          await AsyncStorage.setItem("userData", jsonValue);
          const asyncvalue = AsyncStorage.getItem("userData");
          console.log("async data", await asyncvalue);
          navigation.navigate("MainLayout");
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        ToastAndroid.show("User Successfully Register", ToastAndroid.LONG);
      } catch (error) {
        console.log("User sign-up failed:", error.message);
        if (error.code === "auth/email-already-in-use") {
          ToastAndroid.show("Email Id Already Used!", ToastAndroid.LONG);
        } else {
        }
      }
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

        <View style={{ zIndex: 11, marginBottom: 5, marginTop: 5 }}>
          <Controller
            control={control}
            name="schoolName"
            // rules={{
            //   required: "School Name is required",
            // }}
            render={({ field, error }) => (
              <>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    style={{
                      borderColor: "#B7B7B7",
                      // height: 50,
                      width: "100%",
                      height: 60,
                      backgroundColor: COLORS.white,
                      borderRadius: 10,
                      paddingLeft: 20,
                      paddingVertical: 8,
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 5,
                    }}
                    onPress={() => {
                      setClicked(!clicked);
                    }}
                  >
                    <Text
                      style={{
                        ...FONTS.LeagueSpartan_400Regular,
                        fontSize: 14,
                        lineHeight: 12 * 1.7,
                      }}
                    >
                      {selectedSchoolName == ""
                        ? "Select School Name"
                        : selectedSchoolName}
                    </Text>

                    {/* {clicked ? (
          <Image
            source={require('./upload.png')}
            style={{width: 20, height: 20}}
          />
        ) : (
          <Image
            source={require('./dropdown.png')}
            style={{width: 20, height: 20}}
          />
        )} */}
                  </TouchableOpacity>

                  {clicked ? (
                    <View
                      style={{
                        elevation: 5,
                        height: 200,
                        alignSelf: "center",
                        width: "100%",
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        marginBottom: 5,
                      }}
                    >
                      <TextInput
                        placeholder="Search.."
                        placeholderTextColor={{
                          ...FONTS.LeagueSpartan_400Regular,
                          fontSize: 14,
                          color: COLORS.gray,
                          lineHeight: 12 * 1.7,
                        }}
                        value={search}
                        ref={searchRef}
                        onChangeText={(txt) => {
                          onSearch(txt);
                          setSearch(txt);
                        }}
                        style={{
                          width: "95%",
                          height: 50,
                          alignSelf: "center",
                          borderWidth: 0.2,
                          borderColor: "#8e8e8e",
                          borderRadius: 7,
                          marginTop: 5,
                          paddingLeft: 20,
                        }}
                      />

                      <FlatList
                        data={schoolsList}
                        renderItem={({ item, index }) => {
                          return (
                            <TouchableOpacity
                              style={{
                                width: "90%",
                                alignSelf: "center",
                                height: 40,
                                justifyContent: "center",
                                borderBottomWidth: 0.5,
                                borderColor: "#8e8e8e",
                              }}
                              onPress={() => {
                                setSelectedSchoolName(item.schoolName);
                                setClicked(!clicked);
                                onSearch("");
                                setSearch("");
                              }}
                            >
                              <Text style={{ fontWeight: "600" }}>
                                {item.schoolName}
                              </Text>
                            </TouchableOpacity>
                          );
                        }}
                      />
                    </View>
                  ) : null}
                </View>
              </>
            )}
          />
        </View>
        <View style={{ zIndex: 11, marginBottom: 5, marginTop: 5 }}>
          <Controller
            control={control}
            name="role"
            rules={{
              required: "Role is required",
            }}
            render={({ field, error }) => (
              <>
                <DropDownPicker
                  placeholder="Select"
                  style={styles.dropdown}
                  open={open}
                  // value={value}
                  value={field.value}
                  setValue={(callback) => field.onChange(callback())}
                  items={items}
                  setOpen={setOpen}
                  // setValue={setValue}
                  setItems={setItems}
                  placeholderStyle={{
                    ...FONTS.LeagueSpartan_400Regular,
                    fontSize: 14,
                    color: COLORS.gray,
                    lineHeight: 12 * 1.7,
                  }}
                  dropDownContainerStyle={{
                    backgroundColor: COLORS.white,
                    borderColor: COLORS.white,
                    marginTop: 4,
                    elevation: 5,
                  }}
                  selectedItemContainerStyle={{
                    backgroundColor: COLORS.white,
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
        {/* <Controller
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
              value: /[^A-Za-z]/gi,
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
        /> */}
        {/* {role == "student" && (
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
                      backgroundColor: COLORS.lightGray,
                      borderColor: COLORS.white,
                    }}
                    selectedItemContainerStyle={{
                      backgroundColor: COLORS.lightGray,
                      borderColor: COLORS.white,
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
        )} */}
        {role == "student" && (
          <View style={{ flex: 1, marginBottom: 5 }}>
            <TouchableOpacity
              style={{
                borderColor: "#B7B7B7",
                // height: 50,
                width: "100%",
                height: 60,
                backgroundColor: COLORS.white,
                borderRadius: 10,
                paddingLeft: 20,
                paddingVertical: 8,
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 5,
              }}
              onPress={() => {
                setClicked1(!clicked1);
              }}
            >
              <Text
                style={{
                  ...FONTS.LeagueSpartan_400Regular,
                  fontSize: 14,
                  lineHeight: 12 * 1.7,
                }}
              >
                {classList == "" ? "Select class" : classList}
              </Text>
            </TouchableOpacity>

            {clicked1 ? (
              <ScrollView horizontal>
                {classItems.map((chip, index) => (
                  <View style={styles.chip}>
                    {/* <Text>{chip.label}</Text> */}
                    <TouchableOpacity
                      onPress={() => {
                        setClassList(chip.value);
                        setClicked1(!clicked1);
                      }}
                    >
                      <Text style={styles.chipLabel}>{chip.label}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            ) : null}
          </View>
        )}

        <Controller
          control={control}
          name="username"
          rules={{
            required: "User Name is required",
            minLength: {
              value: 3,
              message: "User Name should be at least 3 characters long",
            },
            maxLength: {
              value: 20,
              message: "User Name should be max 23 characters long",
            },
          }}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <InputField
              title="User Name"
              placeholder="username"
              contaynerStyle={{ marginBottom: 10 }}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={error}
              icon={
                <View style={{ padding: 20 }}>
                  <Username />
                </View>
              }
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
              icon={
                <View style={{ padding: 20 }}>
                  <EmailSvg />
                </View>
              }
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should be minimum 8 characters long",
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
                  {!hidePass ? <EyeOn /> : <EyeOff />}
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
              &nbsp; Sign in.
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View
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
        </View> */}
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
    borderColor: "#fff",
    // height: 50,
    width: "100%",
    height: 60,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingLeft: 20,
    justifyContent: "center",
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  chip: {
    backgroundColor: "#f2f2f2",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 3,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: COLORS.gray,
    elevation: 5,
  },
  chipLabel: {
    color: COLORS.gray,
  },
});
