import React from "react";
import { Button } from "../../shared/iu";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { takeToWork, closeTask } from "../../app/features/tasks/tasksSlice";
import s from "./TaskActions.module.scss";
import { Loader } from "../../shared/iu/Loader/Loader";

const TaskActions = ({ task, loading }) => {
  const state = task.state;
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const payload = useSelector((state) => state.auth.payload);

  const navigate = useNavigate();

  const handleTakeToWork = () => {
    dispatch(
      takeToWork({ taskId, userId: payload?.id, branchId: payload?.branchId })
    );
  };

  const handleClose = () => {
    dispatch(closeTask({ taskId }));
  };

  return (
    <div className={s.TaskActions}>
      {loading ? (
        <Loader w="150px" h="40px" br="5px" margin="40px auto 0" />
      ) : (
        (state === "new" && (
          <Button variant="success" onClick={handleTakeToWork}>
            Взять в работу
          </Button>
        )) ||
        (state === "inWork" && (
          <Button variant="danger" onClick={handleClose}>
            Звершить задачу
          </Button>
        )) ||
        (state === "closed" && (
          <Button onClick={() => navigate(-1)}>Завершено</Button>
        ))
      )}
    </div>
  );
};

export default TaskActions;
