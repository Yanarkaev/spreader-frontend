import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetState, setLoading, setError } from "../stateSetters";

const initialState = {
  loading: false,
  error: null,
  token: localStorage.getItem("token"),
  payload: null,
  signedUp: false,
  signedIn: false,
  users: [],
  branch: null,
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

// get users

// export const getUsers = createAsyncThunk("users/fetch", async (_, thunkAPI) => {
//   try {
//     const res = await fetch("/spreader/users");
//     return res.json();
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error);
//   }
// });

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.error = null;
    },

    // decodePayload: (state, acti)

    decodePayload: (state, action) => {
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
      .addCase(signup.rejected, )
      .addCase(signup.fulfilled, (state, action) => {
        state.signedUp = true;
        state.branch = action.payload;
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
      })

      // получение работников
      // .addCase(getUsers.pending, setLoading)
      // .addCase(getUsers.rejected, setError)
      // .addCase(getUsers.fulfilled, (state, action) => {
      //   state.users = action.payload;
      //   resetState(state);
      // });
  },
});

export const { setErrorMessage, decodePayload, logOut } = authSlice.actions;
export default authSlice.reducer;
