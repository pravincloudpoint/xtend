import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigation from "./src/navigation/AppNavigation";
import { Provider } from "react-redux";
import { store } from "./src/Slice/Store";

export default function App() {
  let [fontsLoaded] = useFonts({
    LeagueSpartan_400Regular: require("./src/assets/fonts/LeagueSpartan-Regular.ttf"),
    LeagueSpartan_500Medium: require("./src/assets/fonts/LeagueSpartan-Medium.ttf"),
    LeagueSpartan_600SemiBold: require("./src/assets/fonts/LeagueSpartan-SemiBold.ttf"),
    LeagueSpartan_700Bold: require("./src/assets/fonts/LeagueSpartan-Bold.ttf"),

    Lato_400Regular: require("./src/assets/fonts/Lato-Regular.ttf"),
    Lato_500Medium: require("./src/assets/fonts/Lato-Medium.ttf"),
    Lato_600SemiBold: require("./src/assets/fonts/Lato-Semibold.ttf"),
    Lato_700Bold: require("./src/assets/fonts/Lato-Bold.ttf"),

    Spartan_400Regular: require("./src/assets/fonts/Spartan-Regular.ttf"),
    Spartan_500Medium: require("./src/assets/fonts/Spartan-Medium.ttf"),
    Spartan_600SemiBold: require("./src/assets/fonts/Spartan-SemiBold.ttf"),
    Spartan_700Bold: require("./src/assets/fonts/Spartan-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </Provider>
    );
  }
}
