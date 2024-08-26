import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);

  function AddTaskHandler() {
    if (inputValue.trim() === "") return;
    const newTask = {
      text: inputValue,
      id: Date.now(),
    };
    setTasks([...tasks, newTask]);
    setInputValue("");
  }
  function handleDelete(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  return (
    <div className="app">
      <div className="title">My to-Do-List</div>
      <div className="main-frame">
        <div className="input-cnt">
          <InputField inputValue={inputValue} setInputValue={setInputValue} />
          <AddTaskBtn AddTaskHandler={AddTaskHandler} />
        </div>
        <TasksContainer tasks={tasks} onDelete={handleDelete} />
      </div>
    </div>
  );
}

function InputField({ inputValue, setInputValue }) {
  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  return (
    <input
      type="text"
      placeholder="Add a task...!"
      className="input-field"
      onChange={handleInputChange}
      value={inputValue}
    />
  );
}

function AddTaskBtn({ AddTaskHandler }) {
  return (
    <button className="add-btn" onClick={AddTaskHandler}>
      Add
    </button>
  );
}

function TasksContainer({ tasks, onDelete }) {
  return (
    <div className="tasks-cnt">
      {tasks.map((task) => (
        <Task task={task} key={task.id} onDelete={onDelete} />
      ))}
    </div>
  );
}

function Task({ task, onDelete }) {
  const [completed, setCompleted] = useState("");
  const [CompleteImg , setCompleteImg] = useState(null);

  function CompleteTaskHandler() {
    if (completed === "") setCompleted("completed");
    else setCompleted("");
    if (CompleteImg === null) setCompleteImg(<img src="check.png" alt="check icon" />);
    else setCompleteImg(null);
  }

  function DeleteTaskHandler() {
    onDelete(task.id);
  }

  return (
    <div className="task">
      <Completed CompleteTaskHandler={CompleteTaskHandler} img={CompleteImg}/>
      <TaskText
        taskText={task.text}
        CompleteTaskHandler={CompleteTaskHandler}
        Completed={completed}
      />
      <DeleteTask DeleteTaskHandler={DeleteTaskHandler} />
    </div>
  );
}

function Completed({ CompleteTaskHandler, img }) {
  return (
    <button className="complete-btn" onClick={CompleteTaskHandler}>
      {img}
    </button>
  );
}

function DeleteTask({ DeleteTaskHandler }) {
  return (
    <button className="delete-btn" onClick={DeleteTaskHandler}>
      <img src="delete.png" alt="delete icon" />
    </button>
  );
}

function TaskText({ taskText, CompleteTaskHandler, Completed }) {
  const classContent = "task-txt " + Completed;
  return (
    <div className={classContent} onClick={CompleteTaskHandler}>
      {taskText}
    </div>
  );
}

export default App;
