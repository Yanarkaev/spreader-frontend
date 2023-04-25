import { Button } from "../../shared/iu";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { takeToWork, closeTask } from "../../app/features/tasks/tasksSlice";
import s from "./TaskActions.module.scss";
import { Loader } from "../../shared/iu/Loader/Loader";

const TaskActions = ({ loading }) => {
  const task = useSelector((state) => state.tasks.task);
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

  if (loading) {
    return <Loader w="150px" h="40px" br="5px" margin="auto auto 10px" />;
  }

  return (
    <div className={s.TaskActions}>
      {(task.state === "new" && (
        <Button variant="success" onClick={handleTakeToWork}>
          Взять в работу
        </Button>
      )) ||
        (task.state === "inWork" && (
          <Button variant="danger" onClick={handleClose}>
            Звершить задачу
          </Button>
        )) ||
        (task.state === "closed" && (
          <Button onClick={() => navigate(-1)}>Завершено</Button>
        ))}
    </div>
  );
};

export default TaskActions;
