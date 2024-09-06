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

export default function NewTodo({ onNewTodo }: NewTodoProps) {
  const [emoji, setEmoji] = useState("");
  const [name, setName] = useState("");

  const setSeleted = (selected: string) => {
    setName(selected);
  };

  return (
    <>
      {name}

      <ComboBox
        optionValues={["hola", "we", "ke", "ase", ""]}
        onSelect={setSeleted}
        options={{ allowNullish: true }}
      />
    </>
  );
}
