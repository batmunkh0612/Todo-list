"use client";

import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';


const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");

  const handleFilterStatus = (status) => {
    setFilterStatus(status);
  }

  const handleOnChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleAddTodo = () => {
    setTodos([...todos, { title: inputValue, isDone: false, id: uuidv4()}]);
  }

  const handleOnChangeCheckbox = (event, index) => {
    const newTodos = todos.map((todo,i) => {
      if(i === index) todo.isDone = event.target.checked;
      return todo;
    })

    setTodos(newTodos);
  }

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((todo, i) => i !== index);


    setTodos(newTodos);
  }

  const filteredTodos = todos.filter((todo) => {
    if(filterStatus === 'all') return true;
    if(filterStatus === 'active') return !todo.isDone;
    return todo.isDone;
  })


  return (
    <div>
      <div>
        <input onChange={handleOnChange} type="text" />
        <button onClick={handleAddTodo}>add</button>
      </div>
      <div>
        <button onClick={() => handleFilterStatus('all')} className={"bg-gray-500 text-white p-2 rounded-md " + `${filterStatus === "all" ? "!bg-blue-500" : ""}`}>all</button>
        <button onClick={() => handleFilterStatus('active')} className={"bg-gray-500 text-white p-2 rounded-md " + `${filterStatus === "active" ? "!bg-blue-500" : ""}`}>active</button>
        <button onClick={() => handleFilterStatus('completed')} className={"bg-gray-500 text-white p-2 rounded-md " + `${filterStatus === "completed" ? "!bg-blue-500" : ""}`}>completed</button>
      </div>

      {filteredTodos.map((todo, index) => (
        <div key={todo.id} className="flex items-center gap-2 border-b border-gray-300 p-2 w-fit">
          <input onChange={(event) => handleOnChangeCheckbox(event, index)} type="checkbox"  defaultChecked={todo.isDone}/>
          <p>{todo.title}</p>
          <button onClick={() => handleDeleteTodo(index)}>delete</button>
        </div>
      ))}

    </div>
  );
}

export default Home;
