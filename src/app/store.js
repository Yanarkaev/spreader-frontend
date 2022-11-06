import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import branchesSlice from "./features/branches/branchesSlice";
import tasksSlice from './features/tasks/tasksSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        branches: branchesSlice,
        tasks: tasksSlice,
    }
});