import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  token: localStorage.getItem("token"),
  payload: null,
  signedUp: false,
  signedIn: false,
};

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ login, password, branchId }, thunkAPI) => {
    try {
      const res = await fetch("/spreader/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password, branchId }),
      });

      const data = await res.json();

      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      }

      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const signin = createAsyncThunk(
    "auth/signIn",
    async ({ login, password }, thunkAPI) => {
      try {
        const res = await fetch("/spreader/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ login, password }),
        });
  
        const data = await res.json();

        if (data.error) {
          return thunkAPI.rejectWithValue(data.error);
        }
  
        localStorage.setItem("token", data);
  
        return thunkAPI.fulfillWithValue(data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.signedUp = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signin.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.token = action.payload;
        state.loading = false;
        state.signedIn = true;
        state.error = null;
      })
      .addCase(signin.rejected, (state, action) => {
        state.error = action.payload;
        state.token = null;
        state.loading = false;
      });
  },
});

export const { setError } = authSlice.actions;
export default authSlice.reducer;
