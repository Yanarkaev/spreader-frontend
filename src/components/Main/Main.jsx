import React from "react";
import Signup from "./Auth/Signup";
import Signin from "./Auth/Signin";
import { Route, Routes, Navigate } from "react-router-dom";
import styles from "./main.module.scss";
import Dashboard from "../../pages/Dashboard/Dashboard";
// import Task from "../Task/Task";
import Users from "../Users/Users";
import { useSelector } from "react-redux";
import MyTasks from "../../pages/MyTasks/MyTasks";
import Reports from "../Reports/Reports";
import { Sidebar } from "../../shared/iu";
import Task from "../../pages/Task/Task";

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
          <Route path="spreader/dashboard" element={<Dashboard />} />
          <Route path="spreader/tasks/:userId" element={<MyTasks />} />
          <Route path="spreader/task/:taskId" element={<Task />} />
          <Route path="spreader/admin/" element={<Users />} />
          <Route path="spreader/reports" element={<Reports />} />
        </Routes>
      </div>
    );
  }
};

export default Main;
