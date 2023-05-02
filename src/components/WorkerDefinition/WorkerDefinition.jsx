import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../shared/iu/Loader/Loader";
import { useWorker } from "./../../shared/hooks/useWorker";
import s from "./WorkerDefinition.module.scss";

export const WorkerDefinition = () => {
  const { userId } = useParams();
  const { worker, loading } = useWorker(userId);
  console.log(userId);

  return (
    <div className={s.WorkerDefinition}>
      {loading ? (
        <Loader w="280px" h="100px" margin="0 auto" />
      ) : (
        <>
          <div className={s.img}></div>
          <div className={s.info}>
            <div className={s.login}>{worker?.login}</div>
            <div className={s.branch}>{worker?.branchId?.name}</div>
          </div>
        </>
      )}
    </div>
  );
};
