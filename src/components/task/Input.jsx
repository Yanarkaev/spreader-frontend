import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addMessage } from "../../app/features/tasks/tasksSlice";
import s from "./Input.module.scss";

function Input() {
  const task = useSelector((state) => state.tasks.task);
  const payload = useSelector((state) => state.auth.payload);

  const [text, setText] = useState("");

  const dispatch = useDispatch();
  const { taskId } = useParams();

  if (task.branchId?._id === payload?.branchId) {
    const handleSubmit = () => {
      dispatch(addMessage({ taskId, text }));
      setText("");
    };

    return (
      payload?.role === "USER" && (
        <div className={s.container}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Введите сообщение..."
            type="text"
          />
          <button onClick={handleSubmit}>Отправить</button>
        </div>
      )
    );
  }
}

export default Input;
