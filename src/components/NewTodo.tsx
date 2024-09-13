import { useState } from "react";

import "./NewTodo.css";
import { Todo } from "../utils/schemas";
import ComboBox from "./ComboBox";
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
      <EmojiSelector
        onSelect={setEmoji}
        defaultValue={options?.defaultEmoji ?? "O"}
      />
      <ComboBox
        optionValues={options?.nameSuggestions ?? ["op 1", "op 2", ""]}
        onSelect={setName}
        options={{ allowCustomInput: true, allowNullish: false }}
      />
      <button onClick={handleAddClick}>Add</button>
    </div>
  );
}
