import React, { useState, useEffect } from "react";

const TaskForm = ({ onSave, currentTask }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentTask) {
      setName(currentTask.name);
      setDescription(currentTask.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && description) {
      onSave({ name, description, id: currentTask ? currentTask.id : null });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Task Name"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        required
      ></textarea>
      <button type="submit">{currentTask ? "Update" : "Add"} Task</button>
    </form>
  );
};

export default TaskForm;
