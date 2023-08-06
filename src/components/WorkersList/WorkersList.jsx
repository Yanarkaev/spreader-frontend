import { WorkerCard } from "../WorkerCard/WorkerCard";
import { useWorkersList } from "../../shared/hooks/useWorkersList";
import s from "./WorkersList.module.scss";
import { useSelector } from "react-redux";
import { Loader } from "../../shared/iu/Loader/Loader";
import { Empty } from "../../shared/iu";

export const WorkersList = ({ searchValue }) => {
  const { workersList, tasks, workersLoading, tasksLoading } = useWorkersList();
  const sortBranch = useSelector((state) => state.tasks.sortBranch);

  const filteredWorkers = workersList
    .filter((worker) => {
      return sortBranch === "all"
        ? worker
        : worker.branchId?._id === sortBranch._id;
    })
    .filter(
      (el) =>
        el.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        el.surname.toLowerCase().includes(searchValue.toLowerCase())
    );

  if (!filteredWorkers.length) {
    return <Empty>Не найдено</Empty>;
  }

  return (
    <div className={s.WorkersList}>
      {workersLoading || tasksLoading
        ? new Array(10)
            .fill(1)
            .map((el, i) => <Loader key={i} w="230px" h="325px" />)
        : filteredWorkers.map((user) => {
            return <WorkerCard key={user._id} worker={user} tasks={tasks} />;
          })}
    </div>
  );
};
