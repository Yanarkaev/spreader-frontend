import React from "react";
import s from "./Dashboard.module.scss";
import DashboardHeader from "./DashboardHeader";
function Dashboard() {
  return (
    <div className={s.container}>
      <DashboardHeader />
      <div className={s.tableContainer}>
        <table className={s.table}>
          <tr className={s.tableTr}>
            <th>№</th>
            <th>Название</th>
            <th>Отдел</th>
            <th>Статус</th>
            <th>Баллы</th>
            <th>Дата публикации</th>
          </tr>
          <tr className={s.taskTr}>
            <td>1</td>
            <td>Сийн ц1е задач</td>
            <td>Разнорабочий</td>
            <td>Йин ялаз ю</td>
            <td>1000</td>
            <td>Селхан</td>
          </tr>
          <tr className={s.taskTr}>
            <td>2</td>
            <td>Сийн ц1е задач</td>
            <td>Разнорабочий</td>
            <td>Йин ялаз ю</td>
            <td>1000</td>
            <td>Селхан</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
