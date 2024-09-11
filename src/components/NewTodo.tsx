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

  return (
    <>
      <div>
        <EmojiSelector onSelect={setEmoji} />
        <ComboBox
          className="combobox1"
          optionValues={options?.nameSuggestions ?? ["asdf", "hjkljk"]}
          onSelect={setName}
          options={{ allowCustomInput: true, allowNullish: false }}
        />
        <div>ddfggfd</div>
<div>ddfggfd</div>
<div>ddfggfd</div>
<div>ddfggfd</div>
<div>ddfggfd</div>
<div>ddfggfd</div>

        <EmojiSelector onSelect={(emoji) => console.log(emoji)} />
        <EmojiSelector onSelect={(emoji) => console.log(emoji)} />

        <p>{emoji}</p>
        <p>{name}</p>
      </div>
    </>
  );
}
