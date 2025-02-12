const Task = ({ name, isCheck }) => {
  return (
    <div className="task">
      <input type="checkbox" checked={isCheck} />
      <span className={isCheck ? 'task-checked' : ''}>{name}</span>
    </div>
  )
}

export default Task
