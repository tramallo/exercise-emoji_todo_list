import { useState } from "react";

import "./App.css";

import NewTodo from "./components/NewTodo";
import TodosList from "./components/TodosList";
import { Todo } from "./utils/schemas";

export default function App() {
  const [usedTodoNames, setUsedTodoNames] = useState<string[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (newTodo: Todo) => {
    if (!usedTodoNames.includes(newTodo.name)) {
      setUsedTodoNames([...usedTodoNames, newTodo.name]);
    }

    setTodos([...todos, newTodo]);
  };

  const removeTodo = (todoIndex: number) => {
    const todosCopy = [...todos];
    todosCopy.splice(todoIndex, 1);

    setTodos(todosCopy);
  };

  return (
    <div className={`app`}>
      <NewTodo 
        onNewTodo={addTodo} 
        defaultEmoji={"😀"} 
        nameSuggestions={usedTodoNames} 
      />
      <TodosList
        todos={todos}
        onTodoClick={removeTodo}
      />
    </div>
  );
}
