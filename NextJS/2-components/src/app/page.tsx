import Task from '../components/Task'

const App: React.FC = () => {
  return (
    <div className="App">
      <Task name="Commencer les décorations de Noël" isCheck={false} />
      <Task name="Ranger le bureau" isCheck={true} />
      <Task name="Acheter du café" isCheck={false} />
    </div>
  )
}

export default App
