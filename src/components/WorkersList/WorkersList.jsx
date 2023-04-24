import { WorkerCard } from "../WorkerCard/WorkerCard";
import { useWorkersList } from "../../shared/hooks/useWorkersList";
import s from "./WorkersList.module.scss";
import { useSelector } from "react-redux";
import { Loader } from "../../shared/iu/Loader/Loader";

export const WorkersList = ({ searchValue }) => {
  const { users, tasks, workersLoading, tasksLoading } = useWorkersList();
  const sortBranch = useSelector((state) => state.tasks.sortBranch);

  const filteredWorkers = users
    .filter((worker) => {
      return sortBranch === "all"
        ? worker
        : worker.branchId?._id === sortBranch._id;
    })
    .filter((el) => el.login.toLowerCase().includes(searchValue.toLowerCase()));

  console.log(filteredWorkers);

  return (
    <div className={s.WorkersList}>
      {workersLoading || tasksLoading
        ? new Array(10).fill(1).map((el) => <Loader w="230px" h="325px" />)
        : filteredWorkers.map((user) => {
            return <WorkerCard key={user._id} worker={user} tasks={tasks} />;
          })}
    </div>
  );
};
