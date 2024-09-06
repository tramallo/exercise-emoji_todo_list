import { Todo } from "../utils/schemas";

export type TodosListProps = {
  todos: Todo[];
};

export default function TodosList({ todos }: TodosListProps) {
  return (
    <ul>
      {todos.map((todo) => (
        <li>{todo.name}</li>
      ))}
    </ul>
  );
}
