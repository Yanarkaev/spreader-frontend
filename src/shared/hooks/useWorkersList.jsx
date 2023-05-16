import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkersList } from "./../../app/features/users/usersSlice";
import { getTasks } from "./../../app/features/tasks/tasksSlice";

export const useWorkersList = () => {
  const { workersList } = useSelector((state) => state.users);
  const { tasks } = useSelector((state) => state.tasks);
  const tasksLoading = useSelector((state) => state.tasks.loading);
  const workersLoading = useSelector((state) => state.tasks.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWorkersList());
    dispatch(getTasks());
  }, [dispatch]);

  return { workersList, tasks, tasksLoading, workersLoading };
};
