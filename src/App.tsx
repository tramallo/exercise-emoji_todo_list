import { useState } from "react";

import "./App.css";
import NewTodo from "./components/NewTodo";
import TodosList from "./components/TodosList";
import { Todo } from "./utils/schemas";
import Checkbox from "./components/Checkbox";

export default function App() {
  const [currentTheme, setCurrentTheme] = useState("light-theme");
  const [usedTodoNames, setUsedTodoNames] = useState<string[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);

  const switchTheme = () => {
    if (currentTheme == "light-theme") {
      setCurrentTheme("dark-theme");
    } else {
      setCurrentTheme("light-theme");
    }
  };

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
    <div className={`app ${currentTheme}`}>
      <NewTodo
        onNewTodo={addTodo}
        options={{ defaultEmoji: "♦", nameSuggestions: usedTodoNames }}
      />
      <TodosList todos={todos} onTodoSelect={removeTodo} />

      <Checkbox 
        label="no-checked" 
        labelChecked="checked" 
        onStateChange={switchTheme} 
      />
    </div>
  );
}
