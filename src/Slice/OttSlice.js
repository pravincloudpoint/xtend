const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
// http://20.204.171.156/frm
const url =
  "http://192.168.30.1/frm/api/v1/packages";

const options = {
  method: "GET",
  headers: {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)" 
  },
};
export const fetchOtt = createAsyncThunk("fetchVideo", async () => {
  const response = await fetch(url, options);
  const result = await response.json();
  console.log("🚀 ~ fetchOtt ~ result:", result.data.PVOD);
  return result.data.PVOD;
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
