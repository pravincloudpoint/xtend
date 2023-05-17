const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const url =
  "https://ott-details.p.rapidapi.com/advancedsearch?start_year=1970&end_year=2020&min_imdb=6&max_imdb=7.8&genre=action&language=english&type=movie&sort=latest&page=1";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "07500fc9b3mshe6c1761dbf8d65ap1e8badjsn61349e1f972f",
    "X-RapidAPI-Host": "ott-details.p.rapidapi.com",
  },
};
export const fetchOtt = createAsyncThunk("fetch", async () => {
  const response = await fetch(url, options);
  const result = await response.json();
  return result;
});
const OttSlice = createSlice({
  name: "ott",
  initialState: {
    data: null,
    isLoader: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOtt.pending, (state, action) => {
      state.isLoader = true;
    });
    builder.addCase(fetchOtt.fulfilled, (state, action) => {
      state.isLoader = false;
      state.data = action.payload;
    });
    builder.addCase(fetchOtt.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = true;
    });
  },
});

export default OttSlice.reducer;
