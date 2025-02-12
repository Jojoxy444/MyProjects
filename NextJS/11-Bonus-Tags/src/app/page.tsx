'use client'

import React, { useState, useEffect } from 'react'
import Task from '../components/Task'

const App = () => {
  const initialTasks = JSON.parse(localStorage.getItem('tasks')) || []
  initialTasks.forEach((task) => {
    task.tags = task.tags.map((tag) => tag.toLowerCase())
  })

  const [tasks, setTasks] = useState(initialTasks)
  const [newTask, setNewTask] = useState('')
  const [editedTask, setEditedTask] = useState({ id: 0, name: '', isChecked: false })

  const [filterTag, setFilterTag] = useState('')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isChecked: !task.isChecked }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1

      const newTaskItem = { id: newId, name: newTask, isChecked: false, tags: [] }

      const updatedTasks = [...tasks, newTaskItem]
      setTasks(updatedTasks)
      setNewTask('')
    }
  }

  const removeTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id)
    setTasks(updatedTasks)
  }

  const editTask = (id, newName) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, name: newName }
      }
      return task
    })
    setTasks(updatedTasks)
    setEditedTask({ id: 0, name: '', isChecked: false })
  }

  const markAllCompleted = () => {
    const updatedTasks = tasks.map((task) => ({ ...task, isChecked: true }))
    setTasks(updatedTasks)
  }

  const markAllInitial = () => {
    const updatedTasks = tasks.map((task) => ({ ...task, isChecked: false }))
    setTasks(updatedTasks)
  }

  const addTagToTask = (taskId, enteredTag) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId)
    if (taskToUpdate) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          const updatedTask = { ...task }
          updatedTask.tags = updatedTask.tags ? [...updatedTask.tags, enteredTag] : [enteredTag]
          return updatedTask
        }
        return task
      })
      setTasks(updatedTasks)
    } else {
      console.log("La tâche n'existe pas.")
    }
  }

  const completedTasks = tasks.filter((task) => task.isChecked)
  const pendingTasks = tasks.filter((task) => !task.isChecked)

  const filteredTasks = filterTag
    ? pendingTasks.filter((task) => {
        const storedTags = JSON.parse(localStorage.getItem(`taskTags-${task.id}`)) || []
        return storedTags.includes(filterTag.toLowerCase())
      })
    : pendingTasks

  return (
    <div className="App">
      <button onClick={markAllCompleted}>Marquer tout comme terminé</button>
      <button onClick={markAllInitial}>Marquer tout comme en cours</button>

      <div>
        <br />
      </div>

      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Ajouter une nouvelle tâche"
        />
        <button onClick={addTask}>Ajouter</button>
      </div>

      <div>
        <input
          type="text"
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          placeholder="Filtrer par tag"
        />
      </div>

      <div>
        <h2>En cours</h2>
        {filteredTasks.map((task) => (
          <div key={task.id} className="task-container">
            <Task
              id={task.id}
              name={task.name}
              isCheck={task.isChecked}
              toggleTask={() => toggleTask(task.id)}
              removeTask={() => removeTask(task.id)}
              tags={task.tags || []}
              addTagToTask={addTagToTask}
            />
            <button onClick={() => setEditedTask({ id: task.id, name: task.name, isChecked: task.isChecked })}>
              Modifier
            </button>
            <br />
            <br />
          </div>
        ))}
      </div>

      <div>
        <h2>Terminées</h2>
        {completedTasks.map((task) => (
          <div key={task.id} className="task-container">
            <Task
              id={task.id}
              name={task.name}
              isCheck={task.isChecked}
              toggleTask={() => toggleTask(task.id)}
              removeTask={() => removeTask(task.id)}
              tags={task.tags || []}
              addTagToTask={addTagToTask}
            />
            <div className="task-buttons">
              <button onClick={() => setEditedTask({ id: task.id, name: task.name, isChecked: task.isChecked })}>
                Modifier
              </button>
            </div>
          </div>
        ))}
      </div>

      {editedTask.id !== 0 && (
        <div>
          <br />
          <input
            type="text"
            value={editedTask.name}
            onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
          />
          <button onClick={() => editTask(editedTask.id, editedTask.name)}>Valider</button>
        </div>
      )}

      <p>{tasks.every((t) => t.isChecked) ? 'Toutes les cases sont cochées' : 'Veuillez cocher toutes les cases'}</p>
    </div>
  )
}

export default App
