import { useState } from "react"

function TaskForm({ addTask }) {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("Низкий");
    const [deadline, setDeadline] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (title.trim() && deadline) {
            addTask({ title, priority, deadline });
            setTitle("");
            setPriority("Низкий");
            setDeadline("");
        }
    }

    return (
        <form action="" className="task-form" onSubmit={handleSubmit}>
            <input type="text" value={title} placeholder="Название задачи" required onChange={
                (e) => setTitle(e.target.value)
            } />
            <select value={priority} onChange={(e) => { setPriority(e.target.value) }}>
                <option value="Высокий">Высокий</option>
                <option value="Средний">Средний</option>
                <option value="Низкий">Низкий</option>
            </select>
            <input type="datetime-local" required value={deadline} onChange={
                (e) => setDeadline(e.target.value)
            } />
            <button type="submit">Добавить задачу</button>
        </form>
    )
}

export default TaskForm
