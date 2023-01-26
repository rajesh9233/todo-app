import React, { useState } from "react";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faCheck,
  faClose,
  faAngleDoubleLeft,
  faAngleLeft,
  faAngleRight,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [taskValue, setTaskValue] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleCreateTask = (e) => {
    e.preventDefault();
    const task = {
      id: Date.now(),
      task: taskValue,
      completed: false,
    };
    setTasks([...tasks, task]);
    setTaskValue("");
  };

  const handleEditTask = (id) => {
    setEditTaskId(id);
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();
    if (e.target.task.value) {
      const updatedTask = {
        id: editTaskId,
        task: e.target.task.value,
        completed: false,
      };
      const updatedTasks = tasks.map((task) => {
        if (task.id === editTaskId) {
          return updatedTask;
        }
        return task;
      });
      setTasks(updatedTasks);
    }
    setEditTaskId(null);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleCompleteTask = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastTask = currentPage * itemsPerPage;
  const indexOfFirstTask = indexOfLastTask - itemsPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredTasks.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="todo-app">
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          name="task"
          placeholder="Add a task..."
          value={taskValue}
          onChange={(e) => setTaskValue(e.target.value)}
        />
        <button type="submit" disabled={!taskValue}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </form>
      <div className="search">
        <input
          type="text"
          placeholder="Search tasks..."
          onChange={handleSearch}
        />
      </div>
      {currentTasks.length > 0 ? (
        <>
          <ul>
            {currentTasks.map((task) => {
              return editTaskId === task.id ? (
                <form onSubmit={handleUpdateTask}>
                  <input
                    type="text"
                    name="task"
                    defaultValue={
                      tasks.find((task) => task.id === editTaskId).task
                    }
                  />
                  <button type="submit">Update</button>
                  <span>
                    <FontAwesomeIcon
                      icon={faClose}
                      onClick={() => setEditTaskId(null)}
                    />
                  </span>
                </form>
              ) : (
                <li key={task.id} className={task.completed ? "completed" : ""}>
                  {task.task}
                  <span>
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={() => handleEditTask(task.id)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => handleDeleteTask(task.id)}
                    />
                    <FontAwesomeIcon
                      icon={faCheck}
                      onClick={() => handleCompleteTask(task.id)}
                    />
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <FontAwesomeIcon icon={faAngleDoubleLeft} />
            </button>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            {pageNumbers.map((number) => (
              <span
                key={number}
                onClick={() => setCurrentPage(number)}
                className={currentPage === number ? "active" : ""}
              >
                {number}
              </span>
            ))}
            <button
              onClick={handleNextPage}
              disabled={currentPage === pageNumbers.length}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
            <button
              onClick={() => setCurrentPage(pageNumbers.length)}
              disabled={currentPage === pageNumbers.length}
            >
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </button>
          </div>
        </>
      ) : (
        <h5>No task to show</h5>
      )}
    </div>
  );
}

export default TodoApp;
