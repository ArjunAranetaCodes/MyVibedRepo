import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TodoItem } from './components/TodoItem'
import { todoSchema, type Todo, type TodoFilter } from './types/todo'
import './App.css'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodoText, setNewTodoText] = useState('')
  const [filter, setFilter] = useState<TodoFilter>('all')

  const addTodo = (text: string) => {
    try {
      const newTodo = todoSchema.parse({
        id: uuidv4(),
        text,
        completed: false,
      })
      setTodos([...todos, newTodo])
      setNewTodoText('')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      
      <div className="add-todo">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new todo..."
          onKeyPress={(e) => {
            if (e.key === 'Enter' && newTodoText.trim()) {
              addTodo(newTodoText.trim())
            }
          }}
        />
        <button onClick={() => newTodoText.trim() && addTodo(newTodoText.trim())}>
          Add
        </button>
      </div>

      <div className="filters">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      <div className="todo-list">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </div>
  )
}

export default App
