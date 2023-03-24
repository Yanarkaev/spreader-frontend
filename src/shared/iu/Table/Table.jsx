import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "./../../../app/features/tasks/tasksSlice";

const columns = [
  { value: "title", displayValue: "Название" },
  // { value: "", displayValue: "Номер" },
  { value: "branchId?.name", displayValue: "Отдел" },
  { value: "time", displayValue: "Время" },
  { value: "points", displayValue: "Баллы" },
  { value: "createdAt", displayValue: "Дата" },
  { value: "state", displayValue: "Статус" },
];

export const Table = () => {
  //   const rows = useSelector((state) => state.tasks.tasks);
  const rows = useSelector((state) => state.tasks.tasks).filter(
    (elem) => elem.state === "new"
  );
  console.log(rows);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          {columns.map(({ displayValue }) => {
            return <th>{displayValue}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((item, index) => (
          <tr>
            <td>{index + 1}</td>
            {columns.map((el) => {
              return <td>{item[el.value]}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
