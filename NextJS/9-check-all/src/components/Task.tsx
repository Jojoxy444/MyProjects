const Task = ({ name, isCheck, toggleTask }) => {
  return (
    <div className="task" onClick={toggleTask}>
      <input type="checkbox" checked={isCheck} readOnly />
      <span className={isCheck ? 'task-checked' : ''}>{name}</span>
    </div>
  )
}

export default Task
