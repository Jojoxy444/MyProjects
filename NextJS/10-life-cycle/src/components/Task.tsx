const Task = ({ name, isCheck, toggleTask, removeTask }) => {
  const handleRemoveClick = () => {
    console.log(`La tâche "${name}" est supprimée.`)
    removeTask()
  }

  return (
    <div className="task">
      <input type="checkbox" checked={isCheck} onChange={toggleTask} readOnly />
      <span className={isCheck ? 'task-checked' : ''}>{name}</span>
      <br />
      <br />
      <button onClick={handleRemoveClick}>Supprimer</button>
    </div>
  )
}

export default Task
