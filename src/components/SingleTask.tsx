import React, { useState } from "react";
import { Tasks } from "../model";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";
import { Draggable } from "react-beautiful-dnd";


type Props = {
  index: number;
  task: Tasks;
  tasks: Tasks[];
  setAllTasks: React.Dispatch<React.SetStateAction<Tasks[]>>;
  completedTasks: Tasks[];
  setCompletedTasks: React.Dispatch<React.SetStateAction<Tasks[]>>;
  progressTasks: Tasks[];
  setProgressTasks: React.Dispatch<React.SetStateAction<Tasks[]>>;
};

function SingleTask({
  task,
  tasks,
  setAllTasks,
  completedTasks,
  setCompletedTasks,
  progressTasks,
  setProgressTasks,
  index,
}: Props) {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<string>(task.task);


  const handleDone = (id: number) => {
    setAllTasks(
      tasks.map((t) => (t.id === id ? { ...t, isDone: !t.isDone } : t))
    );
  };

  const handleDelete = (id: number) => {
    setAllTasks(tasks.filter((t) => t.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setAllTasks(tasks.map((t) => (t.id === id ? { ...t, task: editTask } : t)));
    setEdit(false);
  };

 
  

  return (
    <>
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <form
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="task"
          onSubmit={(e) => handleEdit(e, task.id)}
        >
          {edit ? (
            <input
              autoFocus
              className="inputEdit"
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
            />
          ) : task.isDone ? (
            <s className="taskBody">{task.task}</s>
          ) : (
            <span className="taskBody">{task.task}</span>
          )}

          <div className="icons">
            <span
              onClick={() => {
                if (!edit && !task.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiOutlineEdit />{" "}
            </span>
            <span onClick={() => handleDelete(task.id)}>
              <AiFillDelete />{" "}
            </span>
            <span onClick={() => handleDone(task.id)}>
              <MdDone />
            </span>
              
          </div>
        </form>
      )}
    </Draggable>
   
    </>
  );
}


export default SingleTask;
