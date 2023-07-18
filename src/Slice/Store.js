import { combineReducers, configureStore } from "@reduxjs/toolkit";
import OttSlice from "./OttSlice";
import AddFavoriteSlice from "./Favorites/AddFavoriteSlice";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";


let persistConfig = {
  key: "root",
  storage:AsyncStorage
};

let rootReducer = combineReducers({
  video: OttSlice,
  favorite: AddFavoriteSlice,
});

let persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
});










// export const store = configureStore({
//   reducer: {
//     video: OttSlice,
//     favorite: AddFavoriteSlice,
//   },
// });
