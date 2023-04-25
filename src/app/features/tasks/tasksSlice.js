import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetState, setError, setLoading } from "../stateSetters";

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

      // получение всех задач
      .addCase(getTasks.pending, setLoading)
      .addCase(getTasks.rejected, setError)
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        resetState(state);
      })

      // получение новых задач
      .addCase(getNewTasks.pending, setLoading)
      .addCase(getNewTasks.rejected, setError)
      .addCase(getNewTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        resetState(state);
      })

      // добавление задачи
      .addCase(addTask.pending, setLoading)
      .addCase(addTask.rejected, setError)
      .addCase(addTask.fulfilled, (state, action) => {
        if (action.payload.state === "new") {
          state.tasks.push(action.payload);
        }
        resetState(state);
      })

      // получение одной задачи
      .addCase(getTaskById.pending, setLoading)
      .addCase(getTaskById.rejected, setError)
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.task = action.payload;
        resetState(state);
      })

      // получение задачи работника
      .addCase(getTasksByUser.pending, setLoading)
      .addCase(getTasksByUser.rejected, setError)
      .addCase(getTasksByUser.fulfilled, (state, action) => {
        state.tasks = action.payload;
        resetState(state);
      })

      // добавление заметки
      .addCase(editNotes.pending, setLoading)
      .addCase(editNotes.rejected, setError)
      .addCase(editNotes.fulfilled, (state, action) => {
        state.task.notes = action.payload;
        resetState(state);
      })

      // взятие задачи в работу
      .addCase(takeToWork.pending, setLoading)
      .addCase(takeToWork.rejected, setError)
      .addCase(takeToWork.fulfilled, (state, action) => {
        state.task = action.payload;
        resetState(state);
      })

      // выполнение задачи
      .addCase(closeTask.pending, setLoading)
      .addCase(closeTask.rejected, setError)
      .addCase(closeTask.fulfilled, (state, action) => {
        state.task = action.payload;
        resetState(state);
      });
  },
});

export const { sortByBranch } = tasksSlice.actions;
export default tasksSlice.reducer;
