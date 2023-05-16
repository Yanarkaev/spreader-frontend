import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { resetState, setError, setLoading } from "../stateSetters";
import { BranchService } from "../../../shared/services/branch.service";

const initialState = {
  branches: [],
};

export const getBranches = createAsyncThunk(
  "branches/fetch",
  async (_, thunkAPI) => {
    try {
      const { data } = await BranchService.getAll();
      return data;
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
      .addCase(getBranches.pending, setLoading)
      .addCase(getBranches.rejected, setError)
      .addCase(getBranches.fulfilled, (state, action) => {
        state.branches = action.payload;
        resetState(state);
      });
  },
});

export default branchesSlice.reducer;
