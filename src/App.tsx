import { useState } from "react";

import "./App.css"
import NewTodo from "./components/NewTodo";
import TodosList from "./components/TodosList";
import { Todo } from "./utils/schemas";

export default function App() {
  const [ currentTheme, setCurrentTheme ] = useState("light-theme")
  const [ todos, setTodos ] = useState<Todo[]>([])

  const switchTheme = () => {
    if (currentTheme == "light-theme") {
      setCurrentTheme("dark-theme")
    } else {
      setCurrentTheme("light-theme")
    }
  }

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo])
  }

  const removeTodo = (todoIndex: number) => {
    const todosCopy = [...todos]
    todosCopy.splice(todoIndex, 1)

    setTodos(todosCopy)
  }

  return (
    <div className={`app ${currentTheme}`}>
      <TodosList
        className="custom-todos-list"
        todos={todos}
        onTodoSelect={removeTodo}
      />
      <NewTodo onNewTodo={addTodo} options={{defaultEmoji: "♦"}} />

      <button onClick={switchTheme}>Switch theme</button>
    </div>
  )
}
