import { useState } from "react";

import "./NewTodo.css";
import { Todo } from "../utils/schemas";
import ComboboxInput from "./ComboboxInput.tsx";
import EmojiSelector from "./EmojiSelector";
import Button from "./Button.tsx";
import { EmojiReference, getEmoji } from "../utils/emojis.ts";

export type NewTodoProps = {
  onNewTodo: (newTodo: Todo) => void;
  defaultEmoji: EmojiReference;
  nameSuggestions: string[];
};

export default function NewTodo({ onNewTodo, defaultEmoji, nameSuggestions }: NewTodoProps) {
  const [emoji, setEmoji] = useState<EmojiReference>(defaultEmoji);
  const [name, setName] = useState("");

  const handleAddClick = () => {
    const emojiString = getEmoji(emoji);

    //ignore when info not fullfilled
    if (!emojiString || !name) {
      return;
    }

    const newTodo: Todo = {
      emoji: emojiString,
      name: name,
    };

    onNewTodo(newTodo);
  };

  return (
    <div className="new-todo">
      <EmojiSelector
        selected={emoji}
        onSelect={setEmoji}
        closeOnSelect={true}
      />
      <ComboboxInput
        suggestions={nameSuggestions}
        onSelect={setName}
        options={{ allowCustomInput: true, allowNullish: true }}
      />
      <Button onClick={handleAddClick}>Add</Button>
    </div>
  );
}
