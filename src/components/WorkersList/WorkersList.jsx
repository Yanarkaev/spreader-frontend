import { WorkerCard } from "../WorkerCard/WorkerCard";
import { useWorkersList } from "./../../shared/hooks/useWorkersList";
import s from "./WorkersList.module.scss";
import { useSelector } from "react-redux";

export const WorkersList = ({searchValue}) => {
  const { users, tasks, loading } = useWorkersList();
  const sortBranch = useSelector((state) => state.tasks.sortBranch);
  
  const filteredWorkers = users.filter((worker) => {
    return sortBranch === "all"
      ? worker
      : worker.branchId?._id === sortBranch._id;
  }).filter((el) => el.login.toLowerCase().includes(searchValue.toLowerCase()));

  console.log(filteredWorkers);

  return (
    <div className={s.WorkersList}>
      {filteredWorkers.map((user) => {
        return (
          <WorkerCard
            key={user._id}
            worker={user}
            tasks={tasks}
            loading={loading}
          />
        );
      })}
    </div>
  );
};
