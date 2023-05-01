import React from "react";
import Signin, { SignIn } from "./Auth/Signin";
import { Route, Routes, Navigate } from "react-router-dom";
import "./main.scss";
import Dashboard from "../../pages/Dashboard/Dashboard";
import { useSelector } from "react-redux";
import MyTasks from "../../pages/MyTasks/MyTasks";
import Reports from "../Reports/Reports";
import { Sidebar } from "../../shared/iu";
import Task from "../../pages/Task/Task";
import { Monitoring } from "./../../pages/Monitoring/Monitoring";
import { SignUp } from "./Auth/Signup";

const Main = () => {
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    return (
      <div>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </div>
    );
  }

  if (token) {
    return (
      <div className="Main">
        <Sidebar />
        <Routes>
          <Route
            path="*"
            element={<Navigate to="spreader/dashboard" replace />}
          />
          <Route path="spreader/dashboard" element={<Dashboard />} />
          <Route path="spreader/tasks/:userId" element={<MyTasks />} />
          <Route path="spreader/task/:taskId" element={<Task />} />
          <Route path="spreader/admin/" element={<Monitoring />} />
          <Route path="spreader/reports" element={<Reports />} />
        </Routes>
      </div>
    );
  }
};

export default Main;
