import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
    setCurrentTask(null);
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setCurrentTask(taskToEdit);
  };

  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id === updatedTask.id
          ? {
              ...task,
              name: updatedTask.name,
              description: updatedTask.description,
            }
          : task
      )
    );
    setCurrentTask(null);
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="task-list">
      <TaskForm
        onSave={currentTask ? updateTask : addTask}
        currentTask={currentTask}
      />
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={editTask}
          onDelete={deleteTask}
          onToggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;
