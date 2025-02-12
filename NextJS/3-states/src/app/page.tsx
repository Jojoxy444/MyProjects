"use client";

import Task from '../components/Task'
import { useState } from 'react'

const App = () => {
  const [isAllChecked, setIsAllChecked] = useState(false)

  const toggleAllTasks = () => {
    setIsAllChecked((renderIsAllChecked) => !renderIsAllChecked)
  }

  return (
    <div className="App">
      <button onClick={toggleAllTasks}>{isAllChecked ? 'Décocher tout' : 'Cocher tout'}</button>
      <Task name="Commencer les décorations de Noël" isCheck={isAllChecked} />
      <Task name="Ranger le bureau" isCheck={isAllChecked} />
      <Task name="Acheter du café" isCheck={isAllChecked} />
    </div>
  )
}

export default App
