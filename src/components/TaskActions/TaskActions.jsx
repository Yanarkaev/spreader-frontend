import React from "react";
import { Button } from "../../shared/iu";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { takeToWork, closeTask } from "../../app/features/tasks/tasksSlice";
import s from "./TaskActions.module.scss"

const TaskActions = ({ task }) => {
  const state = task.state;
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const payload = useSelector((state) => state.auth.payload);

  const navigate = useNavigate()
  console.log(navigate)

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
      {state === "new" && (
        <Button variant="success" onClick={handleTakeToWork}>
          Взять в работу
        </Button>
      )}

      {state === "inWork" && (
        <Button variant="danger" onClick={handleClose}>
          Звершить задачу
        </Button>
      )}

      {state === "closed" && <Button onClick={() => navigate(-1)}>Завершено</Button>}
    </div>
  );
};

export default TaskActions;
