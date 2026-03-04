import './App.css'
import Header from './components/Header/Header'
import { useTasks } from './api/hooks'
import { useFilterStore } from './stores/filterStore'
import { useUiStore } from './stores/uiStore'

function App() {
  const { data: tasks = [], isLoading, error } = useTasks()
  const { statusFilter, priorityFilter } = useFilterStore()
  const { theme } = useUiStore()

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = statusFilter === 'all' || task.status === statusFilter
    const priorityMatch = priorityFilter === 'all' || task.priority === priorityFilter
    return statusMatch && priorityMatch
  })

  return (
    <div className={`app ${theme}`}>
      <Header />
      <main style={{ padding: '20px' }}>
        {isLoading && <p>Loading tasks...</p>}
        {error && <p>Error loading tasks: {error.message}</p>}
        {!isLoading && filteredTasks.length === 0 && <p>No tasks found</p>}
        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> - {task.status} ({task.priority})
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App
