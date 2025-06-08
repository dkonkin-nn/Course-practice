function TaskItem({ task, deleteTask, completeTask }) {
    const priorityClass = {
        "Низкий": "low",
        "Средний": "medium",
        "Высокий": "high",
    }

    return (
        <li className={`task-item ${priorityClass[task?.priority]}`}>
            <div className="task-info">
                <div>
                    {task?.title} <strong>{task?.priority}</strong>
                </div>
                <div className="Task-deadline">
                    {new Date(task?.deadline).toLocaleString()}
                </div>
            </div>
            <div className="task-buttons">
                {!task.completed && <button onClick={() => completeTask(task.id)} className="complete-button">Выполнить</button>}
                <button onClick={() => deleteTask(task.id)} className="delete-button">Удалить</button>
            </div>
        </li>
    )
}

export default TaskItem
