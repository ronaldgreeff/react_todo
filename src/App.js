import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([]) // hook for class@state
  const todoNameRef = useRef() // hook for accessing a ref element (<input> below)

  /* To persist data in local storage */
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])
  /* To persist data in local storage */

  function toggleTodo(id) {
    const newTodos = [...todos] // copy of current Todos
    const todo = newTodos.find(todo => todo.id === id) // find todo with id equal to
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: 'x', name: name, complete: false}]
    })
    todoNameRef.current.value = null // clear input value
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  // <> is a fragment
  return (
    <>
      <TodoList toggleTodo={toggleTodo} todos={todos} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear completed todos</button>
      <div>{todos.filter(todo => !todo.complete).length} left todo</div>
    </>
  )
}


export default App;
