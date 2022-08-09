import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import AddTodo from "./AddTodo";

export default function Index() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const todosList = JSON.parse(localStorage.getItem("todoList"));
    if (todosList && todosList.length) {
      setTodoList(todosList);
    }
  }, []);

  const handleInputChange = (e, i) => {
    const todos = [...todoList];
    todos[i].name = e.target.value;
    setTodoList(todos);
  };

  const handleAddTodo = (taskName, i) => {
    if (taskName) {
      const todos = [...todoList];
      todos[i].name = taskName;
      todos[i].isDone = false;
      todos[i].isEdit = false;
      todos[i].createdAt = Date.now();
      setTodoList(todos);
      localStorage.setItem("todoList", JSON.stringify(todos));
    }
  };

  const addTodoList = (taskName) => {
    const todos = [...todoList];
    todos.push({
      name: taskName,
      id: todoList.length + 1,
      createdAt: Date.now(),
      isDone: false,
      isEdit: false,
    });
    setTodoList(todos);
    localStorage.setItem("todoList", JSON.stringify(todos));
  };

  const handleEdit = (i) => {
    const todos = [...todoList];
    todos[i].isEdit = true;
    todos[i].isDone = false;
    setTodoList(todos);
  };
  const handleSave = (i) => {
    const todos = [...todoList];
    todos[i].isDone = false;
    todos[i].isEdit = false;
    todos[i].createdAt = Date.now();
    setTodoList(todos);
    localStorage.setItem("todoList", JSON.stringify(todos));
  };
  const handleComplete = (i) => {
    const todos = [...todoList];
    todos[i].isDone = true;
    todos[i].isEdit = false;
    todos[i].createdAt = Date.now();
    setTodoList(todos);
    localStorage.setItem("todoList", JSON.stringify(todos));
  };
  return (
    <div>
      <AddTodo addToTodo={addTodoList} />
      <div>
        {todoList && todoList.length > 0 ? (
          todoList.map((item, i) => {
            return (
              <Card
                todo={item}
                key={i}
                onEdit={() => handleEdit(i)}
                onSave={() => handleSave(i)}
                onComplete={() => handleComplete(i)}
                handleInputChange={(e) => handleInputChange(e, i)}
                handleAddTodo={(e) => handleAddTodo(e, i)}
              />
            );
          })
        ) : (
          <h5>You don't have any task.Click Add Task to Create the task</h5>
        )}
      </div>
    </div>
  );
}
