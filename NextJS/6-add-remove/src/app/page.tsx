'use client'

import { useState } from 'react'
import Task from '../components/Task'

const App = () => {
  const initialTasks = [
    { name: 'Commencer les décorations de Noël', isChecked: false },
    { name: 'Ranger le bureau', isChecked: true },
    { name: 'Acheter du café', isChecked: false }
  ]

  const [tasks, setTasks] = useState(initialTasks)
  const [newTask, setNewTask] = useState('')

  const toggleTask = (index: number) => {
    const updatedTasks = [...tasks]
    updatedTasks[index].isChecked = !updatedTasks[index].isChecked
    setTasks(updatedTasks)
  }

  const addTask = () => {
    if (newTask.trim() !== '') {
      const updatedTasks = [...tasks, { name: newTask, isChecked: false }]
      setTasks(updatedTasks)
      setNewTask('')
    }
  }

  const removeTask = (index: number) => {
    const updatedTasks = [...tasks]
    updatedTasks.splice(index, 1)
    setTasks(updatedTasks)
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

      {tasks.map((task, index) => (
        <div key={index} className="task-container">
          <Task name={task.name} isCheck={task.isChecked} toggleTask={() => toggleTask(index)} />
          <button onClick={() => removeTask(index)}>Supprimer</button>
        </div>
      ))}

      <p>{tasks.every((t) => t.isChecked) ? 'Toutes les cases sont cochées' : 'Veuillez cocher toutes les cases'}</p>
    </div>
  )
}

export default App
