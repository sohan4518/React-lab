import React, { useState } from "react";
import "./index.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const [form, setForm] = useState({
    name: "",
    date: "",
    desc: "",
  });

  const addTask = (e) => {
    e.preventDefault();

    if (form.name && form.date) {
      setTasks([
        ...tasks,
        { ...form, done: false },
      ]);

      setForm({
        name: "",
        date: "",
        desc: "",
      });
    }
  };

  const toggleTask = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index
          ? { ...task, done: !task.done }
          : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "done") return task.done;
    return !task.done;
  });

  return (
    <div className="app">
      <h1>Reminder App</h1>

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Task Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({
              ...form,
              date: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Description"
          value={form.desc}
          onChange={(e) =>
            setForm({
              ...form,
              desc: e.target.value,
            })
          }
        />

        <button>Add</button>
      </form>

      <div className="filters">
        <button onClick={() => setFilter("all")}>
          All
        </button>

        <button onClick={() => setFilter("done")}>
          Done
        </button>

        <button onClick={() => setFilter("notdone")}>
          Not Done
        </button>
      </div>

      <ul>
        {filteredTasks.map((task, index) => (
          <li
            key={index}
            onClick={() => toggleTask(index)}
            className={task.done ? "done" : ""}
          >
            <b>{task.name}</b> - {task.date}
            {task.desc && ` - ${task.desc}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
