import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  token: localStorage.getItem("token"),
  payload: null,
  signedUp: false,
  signedIn: false,
  users: [],
  branch: null
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

export const getUsers = createAsyncThunk("users/fetch", async (_, thunkAPI) => {
  try {
    const res = await fetch("/spreader/users");
    return res.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = null;
    },

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

    logOut: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
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
        state.branch = action.payload
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //===
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
        console.log(state);
        state.error = action.payload;
        state.token = null;
        state.loading = false;
      })
      // ===
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
      });
  },
});

export const { setError, decodePayload, logOut } = authSlice.actions;
export default authSlice.reducer;
