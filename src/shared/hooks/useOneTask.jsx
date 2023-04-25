import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTaskById } from "../../app/features/tasks/tasksSlice";

export const useOneTask = () => {
  const { taskId } = useParams();

  const dispatch = useDispatch();
  const { task, loading } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getTaskById(taskId));
  }, [dispatch, task.state]); // eslint-disable-line react-hooks/exhaustive-deps

  return { task, loading };
};
