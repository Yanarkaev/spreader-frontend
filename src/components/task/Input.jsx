import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addMessage } from "../../app/features/tasks/tasksSlice";
import s from "./Input.module.scss";
function Input() {
  const [text, setText] = useState("");

  const dispatch = useDispatch();
  const { taskId } = useParams();
  const handleSubmit = () => {
    dispatch(addMessage({ taskId, text }));
    setText("");
  };

  return (
    <div className={s.container}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите сообщение..."
        type="text"
      />
      <button onClick={handleSubmit}>Отправить</button>
    </div>
  );
}

export default Input;
