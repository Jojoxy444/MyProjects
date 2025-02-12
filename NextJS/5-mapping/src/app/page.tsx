'use client'

import { useState } from 'react'
import Task from '../components/Task'

const App = () => {
  // Définition de l'état initial des tâches
  const initialTasks = [
    { name: 'Commencer les décorations de Noël', isChecked: false },
    { name: 'Ranger le bureau', isChecked: true },
    { name: 'Acheter du café', isChecked: false }
  ]

  // Utilisation de useState pour gérer l'état des tâches
  const [tasks, setTasks] = useState(initialTasks)

  // Fonction pour inverser l'état isChecked d'une tâche spécifique
  const toggleTask = (index: number) => {
    const updatedTasks = [...tasks]
    updatedTasks[index].isChecked = !updatedTasks[index].isChecked
    setTasks(updatedTasks)
  }

  return (
    <div className="App">
      {/* Bouton pour cocher ou décocher toutes les tâches */}
      <button onClick={() => setTasks(tasks.map((task) => ({ ...task, isChecked: !tasks.every((t) => t.isChecked) })))}>
        {tasks.every((t) => t.isChecked) ? 'Décocher tout' : 'Cocher tout'}
      </button>

      {/* Affichage de chaque tâche en utilisant le composant Task */}
      {tasks.map((task, index) => (
        <Task key={index} name={task.name} isCheck={task.isChecked} toggleTask={() => toggleTask(index)} />
      ))}

      {/* Message indiquant si toutes les cases sont cochées */}
      <p>{tasks.every((t) => t.isChecked) ? 'Toutes les cases sont cochées' : 'Veuillez cocher toutes les cases'}</p>
    </div>
  )
}

export default App
