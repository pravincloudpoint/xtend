const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

// import file from "./../constants/file.json"
// http://20.204.171.156/frm
const url =
 //"http://192.168.30.1/frm/api/v1/packages";
  "http://192.168.30.1/frm/ui/cat/file.json";

const options = {
  method: "GET",
  headers: {
    Accept: "*/*",
    // "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  //  Accept: "application/json",
  },
};
export const fetchOtt = createAsyncThunk("fetchVideo", async () => {
  const response = await fetch(url, options);
  const result = await response.json();
  console.log("🚀 ~ fetchOtt ~ result:", typeof result);
   return result;
  //   console.log("🚀 ~ fetchOtt ~ result:", result.data.PVOD);
  // return result.data.PVOD;
});
const OttSlice = createSlice({
  name: "video",
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
