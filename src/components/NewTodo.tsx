import { useState } from "react";

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
      <ComboBox
        optionValues={options?.nameSuggestions ?? []}
        onSelect={setName}
        options={{ allowCustomInput: true, allowNullish: false }}
      />
      <ComboBox
        optionValues={options?.emojiSuggestions ?? []}
        onSelect={setEmoji}
      />
    </>
  );
}
