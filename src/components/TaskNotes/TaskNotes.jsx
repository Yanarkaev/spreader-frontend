import { useEffect, useState } from "react";
import { Button, Textarea } from "../../shared/iu";
import { useDispatch } from "react-redux";
import { editNotes } from "./../../app/features/tasks/tasksSlice";
import { Loader } from "../../shared/iu/Loader/Loader";
import s from "./TaskNotes.module.scss";

export const TaskNotes = ({ task, loading }) => {
  const dispatch = useDispatch();
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    setNoteText(task.notes);
  }, [task]);

  return (
    <div className={s.TaskNotes}>
      {loading ? (
        <Loader w="100%" h="300px" />
      ) : (
        <>
          <Textarea
            onChange={(e) => setNoteText(e.target.value)}
            className={s.notesInput}
            value={noteText}
          />
          <Button
            variant={noteText === task.notes ? "success" : "default"}
            onClick={() =>
              dispatch(editNotes({ taskId: task._id, text: noteText }))
            }
            disabled={noteText === task.notes}
          >
            {noteText === task.notes ? "Сохранено" : "Сохранить"}
          </Button>
        </>
      )}
    </div>
  );
};