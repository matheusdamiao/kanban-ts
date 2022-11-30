import React from "react";
import "./styles.css";

interface Props {
  tasks: string;
  setTasks: React.Dispatch<React.SetStateAction<string>>;
  addTask: (e: React.FormEvent) => void;
}

const InputField = ({ tasks, setTasks, addTask }: Props) => {
  return (
    <form className="form" onSubmit={addTask}>
      <input
        type="text"
        className="input-task"
        value={tasks}
        onChange={(e) => setTasks(e.target.value)}
      />
      <button type="submit" className="input-btn">
        {" "}
        add
      </button>
    </form>
  );
};

export default InputField;
