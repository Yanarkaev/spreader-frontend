import React from "react";
import s from "./TaskItem.module.scss";
// import img from "../../assets/Admin/Admin.jpg";
import TaskMessage from "./TaskMessage";
import TaskButtons from "./TaskButtons";
function TaskItem({ isCounting, setIsCounting, reasons, reason, setReason }) {
  // console.log(isCounting);
  return (
    <div className={s.container}>
      <div className={s.Admin}>
        <div className={s.AdminLogo}>
          {/* <img src={img} alt="/" /> */}
        </div>
        <div>
          <span className={s.adminName}>Admin</span>
          <span className={s.adminMail}>admin@mail.ru</span>
        </div>
      </div>
      <div className={s.task}>
        <div className={s.taskName}>
          <h1>Хьуллер из хьаэци, циг д1аг1о</h1>
        </div>
        <div className={s.taskDescription}>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus
            esse atque ipsam veritatis hic sit qui, explicabo repellat minus
            dolorem error aut, dolores animi praesentium autem, laborum saepe
            impedit vel? Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Ducimus accusantium placeat maxime qui incidunt aspernatur
            dolorem repudiandae expedita obcaecati consectetur, nobis quis saepe
            vero, deleniti numquam quaerat, cupiditate sint corporis.
          </p>
        </div>
      </div>
      <TaskMessage
        isCounting={isCounting}
        reasons={reasons}
        reason={reason}
        setReason={setReason}
      />
      <TaskButtons isCounting={isCounting} setIsCounting={setIsCounting} />
    </div>
  );
}

export default TaskItem;
