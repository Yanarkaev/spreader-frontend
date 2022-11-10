import React from "react";
import Signup from "./Auth/Signup";
import Signin from "./Auth/Signin";
import { Route, Routes, Navigate } from "react-router-dom";
import styles from "./main.module.scss";
import Dashboard from "../dashboard/Dashboard";
import Sidebar from "../Sidebar/Sidebar";
import Task from "./../task/Task";
import Users from "../Users/Users";
import { redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import MyTasks from "./../MyTasks/MyTasks";
import Reports from "../Reports/Reports";

const Main = () => {
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    return (
      <div>
        <Routes>
          <Route path="spreader/signin" element={<Signin />} />
          <Route path="spreader/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="spreader/signin" replace />} />
        </Routes>
      </div>
    );
  }

  if (token) {
    return (
      <div className={styles.Main}>
        <Sidebar />
        <Routes>
          <Route
            path="*"
            element={<Navigate to="spreader/dashboard" replace />}
          />

          <Route path="spreader/signup" element={<Signup />} />
          <Route path="spreader/dashboard" element={<Dashboard />} />
          <Route path="spreader/tasks" element={<MyTasks />} />
          <Route path="spreader/dashboard/:taskId" element={<Task />} />
          <Route path="spreader/admin/" element={<Users />} />
          <Route path="spreader/reports" element={<Reports />} />
        </Routes>
      </div>
    );
  }
};

export default Main;
