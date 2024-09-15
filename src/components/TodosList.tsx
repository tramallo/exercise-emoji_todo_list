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

  //send callback when 'enter' is pressed on todo
  const handleTodoEnter = (e: React.KeyboardEvent<HTMLLIElement>, todoIndex: number) => {
    //ignore non-enter key presses
    if (e.key != "Enter") {
      return;
    }

    if (onTodoSelect) {
      onTodoSelect(todoIndex)
    }
  }

  return (
    <ul className={`todos-list ${className ?? ""}`}>
      {todos.map((todo, index) => (
        <li 
          key={`todo-${index}`} 
          onClick={() => handleTodoClick(index)} 
          onKeyDown={(e) => handleTodoEnter(e, index)}
          tabIndex={0}
        >
          {todo.emoji} {todo.name}
        </li>
      ))}
    </ul>
  );
}
