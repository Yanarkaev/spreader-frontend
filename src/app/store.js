import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import branchesSlice from "./features/branches/branchesSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        branches: branchesSlice,
    }
});