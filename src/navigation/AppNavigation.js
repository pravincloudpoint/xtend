import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {
  OnBoarding,
  SignIn,
  SignUp,
  ForgotPassword,
  ResetPassword,
  YourPasswordHasBeenReset,
  SignUpAccountCreated,
  ConfirmationCode,
  Home,
  CourseReviews,
  ProfileEdit,
  MainLayout,
  PrivacyPolicy,
  HelpAndSupport,
  PaymentFailed,
  PaymentSuccess,
  ChoosePaymentMethod,
  Checkout,
  AddANewCard,
  MyWallet,
  MyCoupons,
  MyWishlist,
  MyCourses,
  CategoryList,
  CategoryGrid,
  MyProfile,
  CourseDetails,
  CourseCompletedOne,
  CourseCompletedTwo,
  LeaveAReview,
  VerifyYourPhoneNumber,
  Filter,
} from "../screens";
import Player from "../screens/Player";
import TopRatedList from "../screens/TopRatedList";
import ClassGrid from "../screens/ClassGrid";
import OffLinePlayer from "../screens/OffLinePlayer";

const Stack = createStackNavigator();
//test
function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerShown: false,
      }}
      initialRouteName="OnBoarding"
    >
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen
        name="VerifyYourPhoneNumber"
        component={VerifyYourPhoneNumber}
      />
      <Stack.Screen name="LeaveAReview" component={LeaveAReview} />
      <Stack.Screen name="CourseCompletedTwo" component={CourseCompletedTwo} />
      <Stack.Screen name="CourseCompletedOne" component={CourseCompletedOne} />
      <Stack.Screen name="Filter" component={Filter} />
      <Stack.Screen name="CategoryGrid" component={CategoryGrid} />
      <Stack.Screen name="ClassGrid" component={ClassGrid} />
      <Stack.Screen name="CategoryList" component={CategoryList} />
      <Stack.Screen name="TopRatedList" component={TopRatedList} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="CourseReviews" component={CourseReviews} />
      <Stack.Screen name="MyWallet" component={MyWallet} />
      <Stack.Screen name="MyCourses" component={MyCourses} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MyWishlist" component={MyWishlist} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
      <Stack.Screen name="MainLayout" component={MainLayout} />
      <Stack.Screen name="MyCoupons" component={MyCoupons} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="PaymentFailed" component={PaymentFailed} />
      <Stack.Screen name="AddANewCard" component={AddANewCard} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="CourseDetails" component={CourseDetails} />
      <Stack.Screen
        name="ChoosePaymentMethod"
        component={ChoosePaymentMethod}
      />
      <Stack.Screen name="Player" component={Player} />
      <Stack.Screen name="OffLinePlayer" component={OffLinePlayer} />
      <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
      <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
      <Stack.Screen name="ConfirmationCode" component={ConfirmationCode} />
      <Stack.Screen
        name="SignUpAccountCreated"
        component={SignUpAccountCreated}
      />
      <Stack.Screen
        name="YourPasswordHasBeenReset"
        component={YourPasswordHasBeenReset}
      />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}

export default Navigation;
