import TaskDescription from "../../components/TaskDescription/TaskDescription";
import { useSelector } from "react-redux";
import TaskHeader from "../../components/TaskHeader/TaskHeader";
import TaskActions from "../../components/TaskActions/TaskActions";
import { useOneTask } from "./../../shared/hooks/useOneTask";
import s from "./Task.module.scss";
import TaskNotes from "../../components/TaskNotes/TaskNotes";

const Task = () => {
  const { task, loading } = useOneTask();
  return (
    <div className={s.Task}>
      <TaskHeader task={task} loading={loading} />
      <TaskDescription task={task} loading={loading} />
      <TaskNotes task={task} loading={loading}/>
      <TaskActions task={task} loading={loading} />
    </div>
  );
};

export default Task;
