import React from "react";
import s from "./Table.module.scss";
import { useNavigate } from "react-router-dom";

export const Table = ({ columns, rows, className }) => {
  const navigate = useNavigate();

  return (
    <div className={`${s.Table} ${className}`}>
      <table className={s.Table}>
        <thead>
          <tr>
            <th>№</th>
            {columns.map(({ displayValue }, index) => {
              return <th key={index}>{displayValue}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((item, index) => (
            <tr
              key={item._id}
              className={`${s.tRow} ${s[item.state] || ""}`}
              onClick={() => navigate(`/spreader/task/${item._id}`)}
            >
              <td>{index + 1}</td>
              {columns.map(({ value }) => {
                return (
                  <td key={value}>
                    {item[value]?.name ? item[value]?.name : item[value]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
