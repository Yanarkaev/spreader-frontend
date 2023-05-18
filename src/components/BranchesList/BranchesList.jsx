import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBranch,
  getBranches,
} from "../../app/features/branches/branchesSlice";
import s from "./BranchesList.module.scss";
import { Button } from "../../shared/iu";
import { AddBranch } from "../AddBranch/AddBranch";

export const BranchesList = () => {
  const { error, branches } = useSelector((state) => state.branches);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBranches());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteBranch(id));
  };
  return (
    <div className={s.BranchesList}>
      {branches.map((el) => (
        <div key={el._id} className={s.branch}>
          <span>{el.name}</span>
          <Button
            variant="danger"
            className={s.deleteBtn}
            onClick={() => handleDelete(el._id)}
          >
            Удалить
          </Button>
        </div>
      ))}

      <AddBranch />
      {error && <p className={s.error}>{error}</p>}
    </div>
  );
};
