import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { resetState, setError, setLoading } from "./../stateSetters";
const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const getUsers = createAsyncThunk("users/fetch", async (_, thunAPI) => {
  try {
    const res = await fetch("/spreader/users");
    return res.json();
  } catch (error) {
    thunAPI.rejectWithValue(error);
  }
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, setLoading)
      .addCase(getUsers.rejected, setError)
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        resetState(state);
      });
  },
});

export default usersSlice.reducer;
