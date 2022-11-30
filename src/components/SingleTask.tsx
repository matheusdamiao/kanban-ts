import React, { useState } from "react";
import { Tasks } from "../model";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import {SlOptionsVertical} from 'react-icons/sl'
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
  const [isTaskClicked, setIsTaskClicked] = useState<boolean>(false)



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
            <span onClick={()=>{setIsTaskClicked(!isTaskClicked)}}>
              <SlOptionsVertical />
            </span>
          </div>
        </form>
      )}
    </Draggable>
    {isTaskClicked ? <TaskModal task={task} isTaskClicked={isTaskClicked} setIsTaskClicked={setIsTaskClicked} /> : null}
    </>
  );
}


type PropsModal = {
  task: Tasks;
  isTaskClicked: boolean;
  setIsTaskClicked: React.Dispatch<React.SetStateAction<boolean>>
}
export const TaskModal: React.FC<PropsModal> = ({task, isTaskClicked, setIsTaskClicked})=>{
     
  return(
      <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '999999', position: 'absolute', top: '0', left: '0'}} > 
        <div style={{width: '400px', height: '400px', backgroundColor: 'rgba(244, 244, 244, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', borderRadius: '9px', position: 'relative'}}>
          
          <p style={{fontSize: '25px'}}>{task.task}</p>
          <h3>Status: {task.isDone ? 'finalizada' : 'em andamento'}</h3>
          <small> task id: {task.id}</small>
          <button style={{position: 'absolute', right: '20px', top: '20px', cursor: 'pointer', padding: '10px 15px',}}onClick={()=> setIsTaskClicked(!isTaskClicked)}> X </button>
        </div>
        
      </div>
  )
}


export default SingleTask;
