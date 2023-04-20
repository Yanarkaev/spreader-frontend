import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  task: {},
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

export const getNewTasks = createAsyncThunk(
  "tasks/getNew",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("/spreader/tasks/new");
      return res.json();
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

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

export const getTasksByUser = createAsyncThunk(
  "tasks/getByUser",
  async (id, thunkAPI) => {
    try {
      const res = await fetch("/spreader/tasks/user/" + id);
      return res.json();
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const editNotes = createAsyncThunk(
  "taskNotes/patch",

  async ({ taskId, text }, thunkAPI) => {
    try {
      await fetch(`/spreader/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: text }),
      });
      return text;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const takeToWork = createAsyncThunk(
  "inwork/patch",
  async ({ taskId, userId, branchId }, thunkAPI) => {
    try {
      const res = await fetch(`/spreader/tasks/take/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userId, branchId: branchId }),
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
          userId: userId === "Все" ? undefined : userId,
          branchId: branchId === "Все" ? undefined : branchId,
          points: points,
          time: time,
          state: userId !== "Все" ? "inWork" : "new",
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
      .addCase(getNewTasks.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNewTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getNewTasks.rejected, (state, action) => {
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
        console.log(action.payload);
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
        state.error = null;
      })
      .addCase(getTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ==
      .addCase(getTasksByUser.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(getTasksByUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasksByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //==
      .addCase(editNotes.fulfilled, (state, action) => {
        state.task.notes = action.payload;
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
