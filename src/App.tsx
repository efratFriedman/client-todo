import './App.css'
import Header from './components/Header/Header'
import { useUiStore } from './stores/uiStore'
import AddTask from './components/AddTask/AddTask'
import TaskList from './components/TaskList/TaskList'

function App() {

  const { theme } = useUiStore()



  return (
    <div className={`app ${theme}`}>
      <Header />
      <div className="tasks-container">
        <TaskList />
        <AddTask />
      </div>
    </div>
  );
}

export default App
