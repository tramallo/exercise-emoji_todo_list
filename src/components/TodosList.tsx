import "./TodosList.css"
import { Todo } from "../utils/schemas";

export type TodosListProps = {
  className?: string;
  todos: Todo[];
  onTodoClick?: (todoIndex: number) => void
};

export default function TodosList({ className, todos, onTodoClick }: TodosListProps) {
  //send callback when clicked on todo
  const handleTodoClick = (todoIndex: number) => {

    if (onTodoClick) {
      onTodoClick(todoIndex)
    }
  }

  //send callback when 'enter' is pressed on todo
  const handleTodoEnter = (e: React.KeyboardEvent<HTMLLIElement>, todoIndex: number) => {
    //ignore non-enter key presses
    if (e.key != "Enter") {
      return;
    }

    if (onTodoClick) {
      onTodoClick(todoIndex)
    }
  }

  return (
    <ul className={`todos-list ${className ?? ""}`}>
      {todos.map((todo, index) => (
        <li
          key={`todo-${index}`} 
          onKeyDown={(e) => handleTodoEnter(e, index)}
        >
          <div>{todo.name}</div>
          <button 
            onClick={() => handleTodoClick(index)}
            tabIndex={0}
          >
            {todo.emoji}
          </button>
        </li>
      ))}
    </ul>
  );
}
