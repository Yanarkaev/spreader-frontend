import {
  TaskDescription,
  TaskHeader,
  TaskActions,
  TaskNotes,
} from "../../components";
import { useOneTask } from "../../shared/hooks/useOneTask";
import { useSelector } from "react-redux";
import s from "./TaskPage.module.scss";

export const TaskPage = () => {
  const { task, loading } = useOneTask();
  const payload = useSelector((state) => state.auth.payload);

  return (
    <div className={s.Task}>
      <TaskHeader task={task} loading={loading} />
      <TaskDescription task={task} loading={loading} />
      {payload?.role === "USER" &&
        (payload?.id === task?.userId?._id ||
          task?.branchId?._id === payload?.branchId ||
          task?.branchId === undefined) && (
          <>
            <TaskNotes task={task} loading={loading} />
            <TaskActions task={task} loading={loading} />
          </>
        )}
    </div>
  );
};