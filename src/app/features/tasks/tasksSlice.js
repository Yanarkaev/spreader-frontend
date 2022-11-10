import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  task: null,
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

export const getTaskById = createAsyncThunk(
  "tasks/getById",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`/spreader/tasks/${id}`);
      return res.json();
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const addMessage = createAsyncThunk(
  "taskMessage/patch",

  async ({ taskId, text }, thunkAPI) => {
    try {
      await fetch(`/spreader/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      return text;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const takeToWork = createAsyncThunk(
  "inwork/patch",
  async ({ taskId, userId }, thunkAPI) => {
    try {
      const res = await fetch(`/spreader/tasks/take/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userId }),
      });
      return res.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const closeTask = createAsyncThunk(
  "close/patch",
  async ({ taskId }, thunkAPI) => {
    try {
      const res = await fetch(`/spreader/tasks/close/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      return res.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
          userId: userId === "" ? undefined : userId,
          branchId: branchId === "Все" ? undefined : branchId,
          points: points,
          time: time,
        }),
      });

      // console.log(res.json());
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
      })
      // ==
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.task = action.payload;
        state.loading = false;
      })
      .addCase(getTaskById.pending, (state, action) => {
        state.loading = true;
        state.error = null
      })
      .addCase(getTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      


      //==
      .addCase(addMessage.fulfilled, (state, action) => {
        state.task.message.push(action.payload);
      })

      //==
      .addCase(takeToWork.fulfilled, (state, action) => {
        state.task = action.payload;
      })
      //==
      .addCase(closeTask.fulfilled, (state, action) => {
        state.task = action.payload;
      });
  },
});

export const { sortByBranch } = tasksSlice.actions;
export default tasksSlice.reducer;
