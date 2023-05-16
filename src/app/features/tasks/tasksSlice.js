import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetState, setError, setLoading } from "../stateSetters";
import { TaskService } from "../../../shared/services/task.service";

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
    const { data } = await TaskService.getAll();
    return data;
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});

export const getNewTasks = createAsyncThunk(
  "tasks/getNew",
  async (_, thunkAPI) => {
    try {
      const { data } = await TaskService.getNew();
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTaskById = createAsyncThunk(
  "tasks/getById",
  async (id, thunkAPI) => {
    try {
      const { data } = await TaskService.getById(id);
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTasksByUser = createAsyncThunk(
  "tasks/getByUser",
  async (id, thunkAPI) => {
    try {
      const { data } = await TaskService.getByUser(id);
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const editNotes = createAsyncThunk(
  "taskNotes/patch",

  async ({ taskId, text }, thunkAPI) => {
    try {
      const { data } = await TaskService.editNotes({ taskId, text });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const takeToWork = createAsyncThunk(
  "inwork/patch",
  async ({ taskId, userId, branchId }, thunkAPI) => {
    try {
      const { data } = await TaskService.takeToWork({
        taskId,
        userId,
        branchId,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const closeTask = createAsyncThunk(
  "close/patch",
  async ({ taskId }, thunkAPI) => {
    try {
      const { data } = await TaskService.closeTask(taskId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const changeTime = createAsyncThunk(
  "task/changeTime",
  async ({ taskId, time }, thunkAPI) => {
    try {
      const { data } = await TaskService.timeUpdate({ taskId, time });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/add",
  async (taskData, thunkAPI) => {
    try {
      const { data } = await TaskService.addTask(taskData);
      return data;
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

      .addCase(changeTime.pending, setLoading)
      .addCase(changeTime.rejected, setError)
      .addCase(changeTime.fulfilled, (state, action) => {
        state.task.time = action.payload;
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
