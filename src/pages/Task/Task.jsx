import React from "react";
import TaskDescription from "../../components/TaskDescription/TaskDescription";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import TaskHeader from "../../components/TaskHeader/TaskHeader";
import s from "./Task.module.scss";
import TaskActions from "../../components/TaskActions/TaskActions";
import { useOneTask } from "./../../shared/hooks/useOneTask";

const Task = () => {
  const { task, loading } = useOneTask();

  return (
    <div className={s.Task}>
      <TaskHeader task={task} loading={loading} />
      <TaskDescription task={task} loading={loading} />
      <TaskActions task={task} loading={loading} />
    </div>
  );
};

export default Task;
