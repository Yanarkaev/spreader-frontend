import { useState } from "react";
import { Button, Input } from "../../shared/iu";
import { useDispatch, useSelector } from "react-redux";
import {
  addBranch,
  setErrorMessage,
} from "../../app/features/branches/branchesSlice";
import s from "./AddBranch.module.scss";

export const AddBranch = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.branches.error);
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim()) {
      dispatch(addBranch(name));
      setName("");
    }
  };

  const handleChange = (e) => {
    setName(e.target.value);
    if (error) {
      dispatch(setErrorMessage());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={s.AddBranch}>
      <Input value={name} onChange={handleChange} />
      <Button disabled={!name.trim()} className={s.button} variant="primary">
        Добавить
      </Button>
    </form>
  );
};
