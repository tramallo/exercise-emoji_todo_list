import { useState } from "react";

import "./NewTodo.css";
import { Todo } from "../utils/schemas";
import ComboBox from "./ComboBox";
import EmojiSelector from "./EmojiSelector";

export type NewTodoProps = {
  onNewTodo: (newTodo: Todo) => void;
  options?: {
    nameSuggestions?: string[];
  };
};

export default function NewTodo({ onNewTodo, options }: NewTodoProps) {
  const [emoji, setEmoji] = useState("");
  const [name, setName] = useState("");

  const handleAddClick = (e) => {
    //ignore when info not fullfilled
    if(!emoji || !name) {
      return
    }

    const newTodo: Todo = {
      emoji: emoji,
      name: name,
    }

    onNewTodo(newTodo)
  }

  return (
    <>
      <div className="new-todo">
        <EmojiSelector onSelect={setEmoji} defaultValue="X" />
        <ComboBox
          className="combobox1"
          optionValues={options?.nameSuggestions ?? []}
          onSelect={setName}
          options={{ allowCustomInput: true, allowNullish: false }}
        />
        <button onClick={handleAddClick}>Add</button>
      </div>
    </>
  );
}
