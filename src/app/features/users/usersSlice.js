import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { resetState, setError, setLoading } from "./../stateSetters";
const initialState = {
  users: [],
  worker: {},
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

export const getWorker = createAsyncThunk(
  "user/fetch",
  async (userId, thunAPI) => {
    try {
      const res = await fetch("/spreader/users/" + userId);
      return res.json();
    } catch (error) {
      thunAPI.rejectWithValue(error);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // getCurrentUser: (state, action) => {
    //   console.log(action.payload);
    //   state.user = state.users.find((el) => el._id === action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, setLoading)
      .addCase(getUsers.rejected, setError)
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
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
