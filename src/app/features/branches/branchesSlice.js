import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  branches: [],
};

export const getBranches = createAsyncThunk(
  "branches/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("/spreader/branch");
      return res.json();
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const branchesSlice = createSlice({
  name: "branches",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBranches.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = action.payload;
      })
      .addCase(getBranches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default branchesSlice.reducer;
