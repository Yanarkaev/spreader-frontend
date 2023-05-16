import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetState, setLoading, setError } from "../stateSetters";
import { UserService } from "../../../shared/services/user.service";

const initialState = {
  loading: false,
  error: null,
  token: localStorage.getItem("token"),
  payload: null,
  signedUp: false,
  signedIn: false,
  users: [],
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (authData, thunkAPI) => {
    try {
      const { data } = await UserService.signUp(authData);

      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      }

      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signIn",
  async (authData, thunkAPI) => {
    try {
      const { data } = await UserService.signIn(authData);

      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      }

      localStorage.setItem("token", data);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setErrorMessage: (state) => {
      state.error = null;
    },

    decodePayload: (state) => {
      if (!localStorage.getItem("token")) {
        return true;
      }
      let base64Url = localStorage.getItem("token").split(".")[1];
      let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      let jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      state.payload = JSON.parse(jsonPayload);
    },

    logOut: (state) => {
      localStorage.removeItem("token");
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // регистрация
      .addCase(signup.pending, setLoading)
      .addCase(signup.rejected, (state, action) => {
        state.token = null;
        setError(state, action);
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.signedUp = true;
        resetState(state);
      })

      // вход
      .addCase(signin.pending, setLoading)
      .addCase(signin.rejected, (state, action) => {
        state.token = null;
        setError(state, action);
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.token = action.payload;
        state.signedIn = true;
        resetState(state);
      });
  },
});

export const { setErrorMessage, decodePayload, logOut } = authSlice.actions;
export default authSlice.reducer;
