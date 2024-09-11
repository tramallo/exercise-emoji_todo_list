import { useState } from "react";

import "./NewTodo.css";
import { Todo } from "../utils/schemas";
import ComboBox from "./ComboBox";

export type NewTodoProps = {
  onNewTodo: (newTodo: Todo) => void;
  options?: {
    emojiSuggestions?: string[];
    nameSuggestions?: string[];
  };
};

export default function NewTodo({ onNewTodo, options }: NewTodoProps) {
  const [emoji, setEmoji] = useState("");
  const [name, setName] = useState("");

  return (
    <>
      <div>
        <ComboBox
          className="combobox1"
          optionValues={options?.nameSuggestions ?? ["asdf", "hjkljk"]}
          onSelect={setName}
          options={{ allowCustomInput: true, allowNullish: false }}
        />
        <ComboBox
          className="combobox2"
          optionValues={options?.emojiSuggestions ?? ["asdf", "ñlkjñl"]}
          onSelect={setEmoji}
        />
      </div>
    </>
  );
}
