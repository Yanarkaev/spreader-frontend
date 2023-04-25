import TaskDescription from "../../components/TaskDescription/TaskDescription";
import { TaskHeader } from "../../components/TaskHeader/TaskHeader";
import TaskActions from "../../components/TaskActions/TaskActions";
import { useOneTask } from "./../../shared/hooks/useOneTask";
import s from "./Task.module.scss";
import TaskNotes from "../../components/TaskNotes/TaskNotes";
import { useSelector } from "react-redux";

const Task = () => {
  const { task, loading } = useOneTask();
  const payload = useSelector((state) => state.auth.payload);

  return (
    <div className={s.Task}>
      <TaskHeader task={task} loading={loading} />
      <TaskDescription task={task} loading={loading} />
      {payload?.role === "USER" &&
        (payload?.id === task?.userId?._id || task?.branchId?._id === payload?.branchId || task?.branchId === undefined) && (
          <>
            <TaskNotes task={task} loading={loading} />
            <TaskActions task={task} loading={loading} />
          </>
        )}
    </div>
  );
};

export default Task;
