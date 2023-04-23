import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "./../../app/features/users/usersSlice";
import { getTasks } from "./../../app/features/tasks/tasksSlice";

export const useWorkersList = () => {
  const { users } = useSelector((state) => state.users);
  const { tasks } = useSelector((state) => state.tasks);
  const tasksLoading = useSelector((state) => state.tasks.loading);
  const workersLoading = useSelector((state) => state.tasks.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getTasks());
  }, [dispatch]);

  return { users, tasks, tasksLoading, workersLoading };
};
