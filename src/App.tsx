import { useState } from "react";

import NewTodo from "./components/NewTodo";
import TodosList from "./components/TodosList";
import { Todo } from "./utils/schemas";

export default function App() {
  const [ todos, setTodos ] = useState<Todo[]>([])

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo])
  }

  return (
    <div className="app">
      <NewTodo onNewTodo={addTodo} options={{defaultEmoji: "♦"}} />
      <TodosList todos={todos} />
    </div>
  )
}
