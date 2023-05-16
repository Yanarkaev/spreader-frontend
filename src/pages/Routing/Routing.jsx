// import { Suspense } from "react";
// import { lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./Layout";

// const SignUp = lazy(() => import("../Auth/Signup"));
// const SignIn = lazy(() => import("../Auth/Signin"));
// const Dashboard = lazy(() => import("../Dashboard/Dashboard"));
// const Monitoring = lazy(() => import("../Monitoring/Monitoring"));
// const MyTasks = lazy(() => import("../MyTasks/MyTasks"));
// const Task = lazy(() => import("../Task/Task"));
// const Reports = lazy(() => import("../Reports/ReportsPage"));

// const { SignInPage } = lazy(() =>  import ("../AuthPage/SignInPage"));
// const { SignUpPage } = lazy(() =>  import ("../AuthPage/SignUpPage"));
// const { DashboardPage } = lazy(() =>  import ("../DashboardPage/DashboardPage"));
// const { MonitoringPage } = lazy(() =>  import ("../MonitoringPage/MonitoringPage"));
// const { MyTasksPage } = lazy(() =>  import ("../MyTasksPage/MyTasksPage"));
// const { TaskPage } = lazy(() =>  import ("../TaskPage/TaskPage"));
// const { ReportsPage } = lazy(() =>  import ("../ReportsPage/ReportsPage"));

import { SignInPage } from "../AuthPage/SignInPage";
import { SignUpPage } from "../AuthPage/SignUpPage";
import { DashboardPage } from "../DashboardPage/DashboardPage";
import { MonitoringPage } from "../MonitoringPage/MonitoringPage";
import { MyTasksPage } from "../MyTasksPage/MyTasksPage";
import { TaskPage } from "./../TaskPage/TaskPage";
import { ReportsPage } from "../ReportsPage/ReportsPage";
import { useSelector } from "react-redux";

export const PUBLICROUTESLIST = [
  { key: "signup", path: "/signup", Page: SignUpPage },
  { key: "signin", path: "/signin", Page: SignInPage },
  { key: "another", path: "*", Page: SignInPage },
];

export const PRIVATEROUTESLIST = [
  { key: "dashboard", path: "/dashboard", Page: DashboardPage },
  { key: "monitoring", path: "/monitoring", Page: MonitoringPage },
  { key: "mytasks", path: "/task/:userId", Page: MyTasksPage },
  { key: "task", path: "/tasks/task/:taskId", Page: TaskPage },
  { key: "reports", path: "/reports", Page: ReportsPage },
];

export const Routing = () => {
  const token = useSelector((state) => state.auth.token);
  const location = useLocation().pathname.replace("/", '')

  console.log(!!location);
  if (!token) {
    return (
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    );
  }

  if (token) {
    return (
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/tasks/:userId" element={<MyTasksPage />} />
            <Route path="/tasks/task/:taskId" element={<TaskPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/monitoring" element={<MonitoringPage />} />
          </Route>
        </Routes>
      </>
    );
  }
  // return (
  //   <Suspense fallback={<h1>Loading ...</h1>}>
  //     <Routes>
  //       {token ? (
  //         <Route path="/" element={<Layout />}>
  //           {PRIVATEROUTESLIST.map(({ key, path, Page }) => (
  //             <Route key={key} path={path} element={<Page />} />
  //           ))}
  //         </Route>
  //       ) : (
  //         PUBLICROUTESLIST.map(({ key, path, Page }) => (
  //           <Route key={key} path={path} element={<Page />} />
  //         ))
  //       )}
  //     </Routes>
  //   </Suspense>
  // );
};
