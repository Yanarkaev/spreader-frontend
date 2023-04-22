import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorker } from "../../app/features/users/usersSlice";

export const useWorker = (userId) => {
  const payload = useSelector((state) => state.auth.payload);
  const dispatch = useDispatch();
  const { worker, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getWorker(userId));
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  return { worker, loading };
};
