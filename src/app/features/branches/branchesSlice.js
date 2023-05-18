import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { resetState, setError, setLoading } from "../stateSetters";
import { BranchService } from "../../../shared/services/branch.service";

const initialState = {
  branches: [],
  error: null,
  loading: false,
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

export const addBranch = createAsyncThunk(
  "branches/add",
  async (name, thunkAPI) => {
    try {
      const { data } = await BranchService.addBranch(name);
      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      }
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBranch = createAsyncThunk(
  "branches/delete",
  async (id, thunkAPI) => {
    try {
      const { data } = await BranchService.deleteBranch(id);
      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      }
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const branchesSlice = createSlice({
  name: "branches",
  initialState,
  reducers: {
    setErrorMessage: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBranches.pending, setLoading)
      .addCase(getBranches.rejected, setError)
      .addCase(getBranches.fulfilled, (state, action) => {
        state.branches = action.payload;
        resetState(state);
      })
      .addCase(addBranch.pending, setLoading)
      .addCase(addBranch.rejected, setError)
      .addCase(addBranch.fulfilled, (state, action) => {
        state.branches.push(action.payload);
        resetState(state);
      })
      .addCase(deleteBranch.pending, setLoading)
      .addCase(deleteBranch.rejected, setError)
      .addCase(deleteBranch.fulfilled, (state, action) => {
        state.branches = state.branches.filter(
          (item) => item._id !== action.payload._id
        );
        resetState(state);
      });
  },
});

export const { setErrorMessage } = branchesSlice.actions;

export default branchesSlice.reducer;
