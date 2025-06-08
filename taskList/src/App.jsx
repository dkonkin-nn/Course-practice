import { useState } from "react";
import CompletedTaskList from "./components/completedTaskList/CompletedTaskList";
import Footer from "./components/footer/Footer";
import TaskForm from "./components/taskForm/TaskForm";
import TaskList from "./components/taskList/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  const [sortType, setSortType] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");

  const [openSection, setOpenSection] = useState({
    taskList: false,
    tasks: true,
    comletedTasks: true,
  })

  function toggleSection(section) {
    setOpenSection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  function addTask(task) {
    setTasks([...tasks, { ...task, completed: false, id: Date.now() }])
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id))
  }

  function completeTask(id) {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: true } : task))
  }

  function sortTask(tasks) {
    return tasks.slice().sort((a, b) => {
      if (sortType === "priority") {
        const priorityOrder = { "Высокий": 1, "Средний": 2, "Низкий": 3 };
        return sortOrder == "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      } else {
        return sortOrder === "asc"
          ? new Date(a.deadline) - new Date(b.deadline)
          : new Date(b.deadline) - new Date(a.deadline);
      }
    })
  }

  function toggleSortOrder(type) {
    if (sortType === type) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortType(type);
      setSortOrder("asc");
    }
  }

  const activeTasks = sortTask(tasks.filter((task) => !task.completed));
  const completedTasks = tasks.filter((task) => task.completed);

  return <div className="app">
    <div className="task-container">
      <h1>Лист задач с приоритетом</h1>
      <button onClick={() => toggleSection("taskList")} className={`close-button ${openSection["taskList"] ? "open" : ""}`}>+</button>
      {openSection["taskList"] && <TaskForm addTask={addTask} />}
    </div>
    <div className="task-container">
      <h2>
        Задачи
      </h2>
      <button onClick={() => toggleSection("tasks")} className={`close-button ${openSection["tasks"] ? "open" : ""}`}>+</button>
      {openSection["tasks"] &&
        <>
          <div className="sort-controls">
            <button onClick={() => toggleSortOrder("date")} className={`sort-button ${sortType === "date" ? "active" : ""}`}>
              По дате {sortType}
            </button>
            <button onClick={() => toggleSortOrder("priority")} className={`sort-button ${sortType === "priority" ? "active" : ""}`}>
              По приоритету
            </button>
          </div>
          <TaskList completeTask={completeTask} activeTasks={activeTasks} deleteTask={deleteTask} />
        </>}

    </div>
    <div className="completed-task-container">
      <h2>
        Выполненные задачи
      </h2>
      <button onClick={() => toggleSection("comletedTasks")} className={`close-button ${openSection["comletedTasks"] ? "open" : ""}`}>+</button>
      {openSection["comletedTasks"] &&
        <CompletedTaskList completedTasks={completedTasks} deleteTask={deleteTask} />}
    </div>
    <Footer />
  </div>;
}

export default App;
