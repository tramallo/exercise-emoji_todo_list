import { useState } from "react";

import "./EmojiSelector.css";
import { emojis } from "../utils/emojis";
import EmojiList from "./EmojiList";

export type EmojiSelectorProps = {
  defaultValue: string;
  onSelect: (selectedEmoji: string) => void;
};

export default function EmojiSelector({
  onSelect,
  defaultValue,
}: EmojiSelectorProps) {
  const [selectedEmoji, setSelectedEmoji] = useState<string>(defaultValue);

  //select the clicked emoji
  const onEmojiClick = (clickedEmoji: string) => {
    setSelectedEmoji(clickedEmoji);
    onSelect(clickedEmoji);
  };

  return (
    <div className="emoji-selector">
      <button>{selectedEmoji}</button>
      <div className="emoji-selector-pane">
        <EmojiList emojis={emojis} onEmojiClick={onEmojiClick} />
      </div>
    </div>
  );
}
