import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  sortBranch: "all",
};

export const getTasks = createAsyncThunk("tasks/fetch", async (_, thunkAPI) => {
  try {
    const res = await fetch("/spreader/tasks");
    return res.json();
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});


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

  },
});

export const { sortByBranch } = tasksSlice.actions;
export default tasksSlice.reducer;
