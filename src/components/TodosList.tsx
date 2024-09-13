import "./TodosList.css"
import { Todo } from "../utils/schemas";

export type TodosListProps = {
  todos: Todo[];
};

export default function TodosList({ todos }: TodosListProps) {
  return (
    <ul className="todos-list">
      {todos.map((todo, index) => (
        <li key={`todo-${index}`}>
          {todo.emoji} {todo.name}
        </li>
      ))}
    </ul>
  );
}
