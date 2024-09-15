import "./TodosList.css"
import { Todo } from "../utils/schemas";

export type TodosListProps = {
  className?: string;
  todos: Todo[];
};

export default function TodosList({ className, todos }: TodosListProps) {
  return (
    <ul className={`todos-list ${className ?? ""}`}>
      {todos.map((todo, index) => (
        <li key={`todo-${index}`}>
          {todo.emoji} {todo.name}
        </li>
      ))}
    </ul>
  );
}
