'use client'

import { useState } from 'react'
import Task from '../components/Task'

const App = () => {
  const initialTasks = [
    { id: 1, name: 'Commencer les décorations de Noël', isChecked: false },
    { id: 2, name: 'Ranger le bureau', isChecked: true },
    { id: 3, name: 'Acheter du café', isChecked: false }
  ]

  const [tasks, setTasks] = useState(initialTasks)
  const [newTask, setNewTask] = useState('')
  const [editedTask, setEditedTask] = useState({ id: 0, name: '', isChecked: false })

  const toggleTask = (id: number) => {
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
      const updatedTasks = [...tasks, { id: newId, name: newTask, isChecked: false }]
      setTasks(updatedTasks)
      setNewTask('')
    }
  }

  const removeTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id)
    setTasks(updatedTasks)
  }

  const editTask = (id: number, newName: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, name: newName }
      }
      return task
    })
    setTasks(updatedTasks)
    setEditedTask({ id: 0, name: '', isChecked: false })
  }

  return (
    <div className="App">
      {/* Bouton pour cocher ou décocher toutes les tâches */}
      <button onClick={() => setTasks(tasks.map((task) => ({ ...task, isChecked: !tasks.every((t) => t.isChecked) })))}>
        {tasks.every((t) => t.isChecked) ? 'Décocher tout' : 'Cocher tout'}
      </button>

      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Ajouter une nouvelle tâche"
        />
        <button onClick={addTask}>Ajouter</button>
      </div>

      {tasks.map((task) => (
        <div key={task.id} className="task-container">
          <Task name={task.name} isCheck={task.isChecked} toggleTask={() => toggleTask(task.id)} />
          <button onClick={() => removeTask(task.id)}>Supprimer</button>
          <button onClick={() => setEditedTask({ id: task.id, name: task.name, isChecked: task.isChecked })}>
            Modifier
          </button>
        </div>
      ))}

      {editedTask.id !== 0 && (
        <div>
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
