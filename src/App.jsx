import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [newTask, setNewTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editIndex, setEditIndex] = useState(null)

  const handleAddTask = () => {
    if (newTask.trim() === '') return

    if (isEditing) {
      const updatedTasks = [...tasks]
      updatedTasks[editIndex] = newTask
      setTasks(updatedTasks)
      setEditIndex(null)
      setIsEditing(false)
    }
    else {
      setTasks([...tasks, newTask])
    }

    setNewTask('')
  }

  const handleEdit = (index) => {
    setNewTask(tasks[index])
    setIsEditing(true)
    setEditIndex(index)
  }

  const handleDelete = (index) => {
    const filteredTasks = tasks.filter((_, i) => i !== index)
    setTasks(filteredTasks)
  }

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))
    if (storedTasks) {
      setTasks(storedTasks)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])


  return (
    <div className="app-container">
      <h1>TaskNest</h1>

      <div className="todo-input">
        <input type="text" placeholder="Enter a task..." value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <button onClick={handleAddTask}>
          {isEditing ? 'Update Task' : 'Add Task'}
        </button>
      </div>

      <ul className="todo-list">
        {tasks.map((task, index) => (
          <li key={index} className="todo-item">
            <span className="task-text">{task}</span>
            <div className="task-actions">
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App