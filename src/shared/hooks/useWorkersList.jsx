import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from './../../app/features/users/usersSlice';
import { getTasks } from './../../app/features/tasks/tasksSlice';

export const useWorkersList = () => {
  const { users, loading } = useSelector((state) => state.auth);
  const { tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getTasks())
  }, [dispatch]);

  return { users, tasks, loading };
};
