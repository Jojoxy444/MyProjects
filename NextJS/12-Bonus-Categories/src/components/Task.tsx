import React, { useState, useEffect } from 'react'

const Task = ({
  id,
  name,
  isCheck,
  toggleTask,
  removeTask,
  tags,
  addTagToTask,
  categories,
  associateTaskToCategory
}) => {
  const [enteredTag, setEnteredTag] = useState('')
  const [taskTags, setTaskTags] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  const handleAddTag = () => {
    if (enteredTag.trim() !== '' && !taskTags.includes(enteredTag)) {
      if (tags.includes(enteredTag)) {
        addTagToTask(id, enteredTag)
      }
      setTaskTags([...taskTags, enteredTag])
      setEnteredTag('')
      saveTaskTags([...taskTags, enteredTag])
    } else {
      console.log('Le tag existe déjà ou est vide.')
    }
  }

  const handleRemoveClick = () => {
    removeTask(id)
  }

  const removeTagFromTask = (tagToRemove) => {
    const updatedTags = taskTags.filter((tag) => tag !== tagToRemove)
    setTaskTags(updatedTags)
    saveTaskTags(updatedTags)
  }

  const saveTaskTags = (updatedTags) => {
    localStorage.setItem(`taskTags-${id}`, JSON.stringify(updatedTags))
  }

  useEffect(() => {
    const taskTagsInLocalStorage = JSON.parse(localStorage.getItem(`taskTags-${id}`)) || []
    setTaskTags(taskTagsInLocalStorage)
  }, [id])

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
    associateTaskToCategory(id, e.target.value)
  }

  return (
    <div className="task">
      <input type="checkbox" checked={isCheck} onChange={toggleTask} readOnly />
      <span className={isCheck ? 'task-checked' : ''}>{name}</span>
      <input
        type="text"
        value={enteredTag}
        onChange={(e) => setEnteredTag(e.target.value)}
        placeholder="Tag de la tâche"
      />
      <button onClick={handleAddTag}>Valider</button>
      <br />
      <br />
      <button onClick={handleRemoveClick}>Supprimer</button>
      {taskTags.length > 0 && (
        <span>
          {' - Tags : '}
          {taskTags.map((tag, index) => (
            <span key={index}>
              {tag} <button onClick={() => removeTagFromTask(tag)}>Supprimer le tag</button>
            </span>
          ))}
        </span>
      )}

      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Sélectionner une catégorie</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Task
