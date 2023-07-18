import { createSlice } from "@reduxjs/toolkit";

const AddFavoriteSlice = createSlice({
  name: "favorite",
  initialState: [],
  reducers: {
    addFavorite(state, action) {
      state.push(action.payload);
    },
    removeFavorite(state, action) {
      // console.log("🚀 ~ removeFavorite ~ state:", state);
      // console.log("🚀 ~ removeFavorite ~ action.payload.id:", action.payload);
      return state.filter((item) => item.id != action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = AddFavoriteSlice.actions;
export default AddFavoriteSlice.reducer;
