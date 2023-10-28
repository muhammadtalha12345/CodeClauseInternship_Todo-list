import { useState } from "react";
import React from "react";

function Todo() {
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState("");
  const [editable, setEditable] = useState("");
  const [isEditingList, setIsEditingList] = useState([]); // Array to track editing state

  const addBtn = (task) => {
    if (task !== "") {
      setTaskList([...taskList, task]);
      setTask("");
    } else {
      alert("Invalid task");
    }
  };

  const deleteBtn = (index) => {
    let tempList = [...taskList];
    tempList.splice(index, 1);
    setTaskList([...tempList]);
  };

  const editBtn = (index) => {
    setIsEditingList((prev) => {
      const updatedEditingList = [...prev];
      updatedEditingList[index] = true; // Set editing state to true for the clicked task
      return updatedEditingList;
    });
  };

  const saveBtn = (index) => {
    let tempEdit = [...taskList];
    tempEdit[index] = editable;
    setTaskList([...tempEdit]);
    setEditable("");
    setIsEditingList((prev) => {
      const updatedEditingList = [...prev];
      updatedEditingList[index] = false; 
      return updatedEditingList;
    });
  };

  return (
    <div className="App">
      <div className="inputDiv">
        <h1>To do list</h1>
        <input
          placeholder="Enter your task"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
        />
        <button
          onClick={() => {
            addBtn(task);
          }}
        >
          Add Task
        </button>
      </div>
      <div className="taskDiv">
        <h4>Task to do </h4>
        {taskList.map((item, index) => {
          return (
            <div key={index}>
              <li>
                {isEditingList[index] ? (
                  <input
                    onChange={(e) => {
                      setEditable(e.target.value);
                    }}
                  />
                ) : (
                  <input value={item} readOnly />
                )}
                {isEditingList[index] ? (
                  <button onClick={() => saveBtn(index)}>Save</button>
                ) : (
                  <button onClick={() => editBtn(index)}>Edit</button>
                )}
                <button onClick={() => deleteBtn(index)}>Delete</button>
              </li>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Todo;
