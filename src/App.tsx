import { useState } from "react";

import "./App.css"
import NewTodo from "./components/NewTodo";
import TodosList from "./components/TodosList";
import { Todo } from "./utils/schemas";

export default function App() {
  const [ todos, setTodos ] = useState<Todo[]>([])

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo])
  }

  const removeTodo = (todoIndex: number) => {
    const todosCopy = [...todos]
    todosCopy.splice(todoIndex, 1)

    setTodos(todosCopy)
  }

  return (
    <div className="app">
      <TodosList
        className="custom-todos-list"
        todos={todos}
        onTodoSelect={removeTodo}
      />
      <NewTodo onNewTodo={addTodo} options={{defaultEmoji: "♦"}} />
    </div>
  )
}
