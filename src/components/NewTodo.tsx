import { useState } from "react";

import "./NewTodo.css";
import { Todo } from "../utils/schemas";
import ComboboxInput from "./ComboboxInput.tsx";
import EmojiSelector from "./EmojiSelector";

export type NewTodoProps = {
  onNewTodo: (newTodo: Todo) => void;
  defaultEmoji: string;
  nameSuggestions: string[];
};

export default function NewTodo({
  onNewTodo,
  defaultEmoji,
  nameSuggestions,
}: NewTodoProps) {
  const [emoji, setEmoji] = useState(defaultEmoji);
  const [name, setName] = useState("");

  const handleAddClick = () => {
    if (!name || !emoji) {
      return;
    }

    const newTodo: Todo = {
      emoji: emoji,
      name: name,
    };

    onNewTodo(newTodo);
    setName("");
  };

  const handleAddEnter = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key != "Enter") {
      return;
    }

    const button = e.target as HTMLButtonElement;
    button.click();
  };

  return (
    <div className="new-todo">
      <EmojiSelector
        selected={emoji}
        onSelect={setEmoji}
        closeOnSelect={true}
      />
      <ComboboxInput
        className="merge-inner-suggestions-border merge-input-with-suggestions"
        value={name}
        onSelect={setName}
        suggestions={nameSuggestions}
        allowCustomInput={true}
        allowNullishInput={true}
      />
      <button onClick={handleAddClick} onKeyDown={handleAddEnter} tabIndex={0}>
        Add
      </button>
    </div>
  );
}
