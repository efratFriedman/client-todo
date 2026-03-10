import './App.css'
import Header from './components/Header/Header'
import { useUiStore } from './stores/uiStore'
import TaskList from './components/Task/TaskList/TaskList'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AddTask from './components/Task/AddTask/AddTask'
function App() {

  const { theme } = useUiStore()



  return (
    <div className={`app ${theme}`}>
      <ToastContainer position='top-right' autoClose={3000}/>
      <Header />
      <div className="tasks-container">
        <TaskList />
        <AddTask />
      </div>
    </div>
  );
}

export default App
