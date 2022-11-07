import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  sortBranch: "all",
  token: localStorage.getItem("token"),
};

export const getTasks = createAsyncThunk("tasks/fetch", async (_, thunkAPI) => {
  try {
    const res = await fetch("/spreader/tasks");
    return res.json();
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});

export const addTask = createAsyncThunk(
  "tasks/add",
  async ({ title, text, userId, branchId, points, time }, thunkAPI) => {
    try {
      const res = await fetch("/spreader/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          text: text,
          userId: userId,
          branchId: branchId === "Все" ? undefined : branchId,
          points: points,
          time: time,
        }),
      });

      return res.json();
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    sortByBranch: (state, action) => {
      state.sortBranch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ==
      .addCase(addTask.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { sortByBranch } = tasksSlice.actions;
export default tasksSlice.reducer;
