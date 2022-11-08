
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const getUsers = createAsyncThunk(
    "users/fetch",
   async (_, thunAPI) => {
    try {
        const res = await fetch("/spreader/users");
        return res.json()
    } catch (error) {
        thunAPI.rejectWithValue(error)
    }
   }
)

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getUsers.pending, (state, action) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
          })
          .addCase(getUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
    }
}) 

export default usersSlice.reducer
