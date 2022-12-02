import React, { useState, useEffect} from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./App.css";
import InputField from "./components/InputField";
import Task from "./components/Task";
import { Tasks } from "./model";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<string>("");
  const [allTasks, setAllTasks] = useState<Tasks[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Tasks[]>([]);
  const [progressTasks, setProgressTasks] = useState<Tasks[]>([]);
  const [isAllowed, setIsAllowed] = useState<string>('idle');




  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (tasks) {
      setAllTasks([
        ...allTasks,
        { id: Date.now(), task: tasks, isDone: false },
      ]);
      setTasks("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    console.log(result);

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = allTasks,
      progress = progressTasks,
      complete = completedTasks;

    console.log(active);
    console.log(progress);
    console.log(completedTasks);

    if (source.droppableId === "tasklist") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === "taskprogress") {
      add = progress[source.index];
      progress.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "tasklist") {
      active.splice(destination.index, 0, { ...add, isDone: false });
    } else if (destination.droppableId === "taskprogress") {
      progress.splice(destination.index, 0, { ...add, isDone: false });
    } else {
      complete.splice(destination.index, 0, { ...add, isDone: true });
    }

    setCompletedTasks(complete);
    setProgressTasks(progress);
    setAllTasks(active);
    if(isAllowed=== 'yes'){
    saveData()

    }

  };

 

  useEffect(()=>{
    if(isAllowed === 'yes') {
      saveData()
      console.log(isAllowed)
    } 

  },[isAllowed, allTasks, progressTasks, completedTasks])


  useEffect(()=>{
    const todoData = localStorage.getItem('todo') || '';
    const doneData= localStorage.getItem('done') || '';
    const progressData = localStorage.getItem('progress') || '';

    if(todoData !== '' || doneData !== '' || progressData !== '') {
      
      let jsonTodo = JSON.parse(todoData);
      let jsonDone = JSON.parse(doneData);
      let jsonProgress = JSON.parse(progressData);

      console.log(jsonDone, jsonTodo, jsonProgress)

    setAllTasks(jsonTodo);
    setCompletedTasks(jsonDone)
    setProgressTasks(jsonProgress)
   
    }
    

  },[])


  const saveData = ()=>{
    localStorage.setItem('todo', JSON.stringify(allTasks))
    localStorage.setItem('progress', JSON.stringify(progressTasks))
    localStorage.setItem('done', JSON.stringify(completedTasks))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <h1>
          Personal Kanban <span id="title">Board</span>
        </h1>
        <InputField tasks={tasks} setTasks={setTasks} addTask={addTask} />
        <Task
          allTasks={allTasks}
          setAllTasks={setAllTasks}
          completedTasks={completedTasks}
          setCompletedTasks={setCompletedTasks}
          progressTasks={progressTasks}
          setProgressTasks={setProgressTasks}
        />
      </div>
    
    {isAllowed === 'idle' ? <ConfirmationModal isAllowed={isAllowed} setIsAllowed={setIsAllowed}/> : null}
    </DragDropContext>
  );
};


  
interface PropsModal {
  isAllowed: string,
  setIsAllowed: React.Dispatch<React.SetStateAction<string>>,
}

export const ConfirmationModal:React.FC<PropsModal> = ({isAllowed, setIsAllowed})=>{


  const cleanCache = () =>{
    localStorage.clear()
    setIsAllowed('no')
  }

  return(
   <div className="wrapperModal">
    <div className="contentModal">
      <h3> Aceita salvar seus dados no navegador?</h3>
      <p>Dessa forma você pode acessar seus dados mesmo depois de fechar este site </p>
       <div className="btns">
           <button onClick={()=>setIsAllowed('yes')}> Ok, pode salvar.</button>
           <button onClick={()=>setIsAllowed('no')}> Não, obrigado.</button>
           <button onClick={()=>cleanCache()}>Limpar histórico do navegador</button>
       </div>
    </div>
   </div> 
  )
}
export default App;
