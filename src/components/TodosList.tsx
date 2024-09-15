import "./TodosList.css"
import { Todo } from "../utils/schemas";

export type TodosListProps = {
  className?: string;
  todos: Todo[];
  onTodoSelect?: (todoIndex: number) => void
};

export default function TodosList({ className, todos, onTodoSelect }: TodosListProps) {
  //send callback when clicked on todo
  const handleTodoClick = (todoIndex: number) => {

    if (onTodoSelect) {
      onTodoSelect(todoIndex)
    }
  }

  return (
    <ul className={`todos-list ${className ?? ""}`}>
      {todos.map((todo, index) => (
        <li key={`todo-${index}`} onClick={(e) => handleTodoClick(index)}>
          {todo.emoji} {todo.name}
        </li>
      ))}
    </ul>
  );
}
