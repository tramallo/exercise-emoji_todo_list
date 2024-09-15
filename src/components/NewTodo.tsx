import { useState } from "react";

import "./NewTodo.css";
import { Todo } from "../utils/schemas";
import ComboboxInput from "./ComboboxInput.tsx";
import EmojiSelector from "./EmojiSelector";

export type NewTodoProps = {
  onNewTodo: (newTodo: Todo) => void;
  options?: {
    defaultEmoji?: string;
    nameSuggestions?: string[];
  };
};

export default function NewTodo({ onNewTodo, options }: NewTodoProps) {
  const [emoji, setEmoji] = useState(options?.defaultEmoji);
  const [name, setName] = useState("");

  const handleAddClick = () => {
    //ignore when info not fullfilled
    if (!emoji || !name) {
      return;
    }

    const newTodo: Todo = {
      emoji: emoji,
      name: name,
    };

    onNewTodo(newTodo);
  };

  return (
    <div className="new-todo">
      <ComboboxInput
        className="customCombobox"
        suggestions={options?.nameSuggestions ?? ["op1", "op2"]}
        onSelect={setName}
        options={{ allowCustomInput: true, allowNullish: true }}
      />
      <ComboboxInput
        className="defaultCombobox"
        suggestions={options?.nameSuggestions ?? ["op1", "op2"]}
        onSelect={setName}
        options={{ allowCustomInput: true, allowNullish: true }}
      />
      <EmojiSelector
        onSelect={setEmoji}
        defaultValue={options?.defaultEmoji ?? "O"}
      />
      <button onClick={handleAddClick}>Add</button>
    </div>
  );
}
