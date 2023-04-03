import React from "react";
import TaskDescription from "../../components/TaskDescription/TaskDescription";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTaskById } from "../../app/features/tasks/tasksSlice";
import { useParams } from "react-router-dom";
import TaskHeader from '../../components/TaskHeader/TaskHeader';
import s from "./Task.module.scss"
import TaskActions from "../../components/TaskActions/TaskActions";

const Task = () => {
  const { taskId } = useParams();
  const task = useSelector((state) => state.tasks.task);
  const loading = useSelector((state) => state.tasks.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTaskById(taskId));
  }, [dispatch]);

  return (
    <div className={s.Task}>
      <TaskHeader task={task} />
      <TaskDescription task={task} />
      <TaskActions task={task}/>
    </div>
  );
};

export default Task;
