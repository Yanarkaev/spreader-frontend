import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { resetState, setError, setLoading } from "./../stateSetters";
import { UserService } from "../../../shared/services/user.service";

const initialState = {
  workersList: [],
  worker: {},
  loading: false,
  error: null,
};

export const getWorkersList = createAsyncThunk(
  "users/fetch",
  async (_, thunkAPI) => {
    try {
      const { data } = await UserService.getAll();
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const getWorker = createAsyncThunk(
  "worker/fetch",
  async (userId, thunkAPI) => {
    try {
      const { data } = await UserService.getWorker(userId);
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWorkersList.pending, setLoading)
      .addCase(getWorkersList.rejected, setError)
      .addCase(getWorkersList.fulfilled, (state, action) => {
        state.workersList = action.payload;
        resetState(state);
      })
      .addCase(getWorker.pending, setLoading)
      .addCase(getWorker.rejected, setError)
      .addCase(getWorker.fulfilled, (state, action) => {
        state.worker = action.payload;
        resetState(state);
      });
  },
});

export const { getCurrentUser } = usersSlice.actions;
export default usersSlice.reducer;
