import { configureStore } from "@reduxjs/toolkit";
import OttSlice from "./OttSlice";

export const store = configureStore({
  reducer: {
    ott: OttSlice,
  },
});
