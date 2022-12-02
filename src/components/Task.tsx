import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Tasks } from "../model";
import SingleTask from "./SingleTask";
import "./styles.css";

interface Props {
  allTasks: Tasks[];
  setAllTasks: React.Dispatch<React.SetStateAction<Tasks[]>>;
  completedTasks: Tasks[];
  setCompletedTasks: React.Dispatch<React.SetStateAction<Tasks[]>>;
  progressTasks: Tasks[];
  setProgressTasks: React.Dispatch<React.SetStateAction<Tasks[]>>;
}

const Task: React.FC<Props> = ({
  allTasks,
  setAllTasks,
  completedTasks,
  setCompletedTasks,
  progressTasks,
  setProgressTasks,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="tasklist">
        {(provided) => (
          <div
            className="todo"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2> To do </h2>
            {allTasks.map((task, index) => {
              return (
                <SingleTask
                  index={index}
                  task={task}
                  key={task.id}
                  tasks={allTasks}
                  setAllTasks={setAllTasks}
                  completedTasks={completedTasks}
                  setCompletedTasks={setCompletedTasks}
                  progressTasks={progressTasks}
                  setProgressTasks={setProgressTasks}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="taskprogress">
        {(provided) => (
          <div
            className="inprogress"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2> In progress</h2>
            {progressTasks.map((task, index) => {
              return (
                <SingleTask
                  index={index}
                  task={task}
                  key={task.id}
                  tasks={progressTasks}
                  setAllTasks={setProgressTasks}
                  completedTasks={completedTasks}
                  setCompletedTasks={setCompletedTasks}
                  progressTasks={progressTasks}
                  setProgressTasks={setProgressTasks}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="taskdone">
        {(provided) => (
          <div
            className="done"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2> Done </h2>

            {completedTasks.map((task, index) => {
              return (
                <SingleTask
                  index={index}
                  task={task}
                  key={task.id}
                  tasks={completedTasks}
                  setAllTasks={setCompletedTasks}
                  completedTasks={completedTasks}
                  setCompletedTasks={setCompletedTasks}
                  progressTasks={progressTasks}
                  setProgressTasks={setProgressTasks}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      
    </div>
  );
};

export default Task;
