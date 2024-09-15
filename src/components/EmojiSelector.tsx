import { useState } from "react";

import "./EmojiSelector.css";
import { emojis } from "../utils/emojis";
import EmojiList from "./EmojiList";

export type EmojiSelectorProps = {
  className?: string;
  onSelect: (selectedEmoji: string) => void;
  defaultValue: string;
};

export default function EmojiSelector({
  className,
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
    <div className={`emoji-selector ${className ?? ""}`}>
      <button>{selectedEmoji}</button>
      <div className="emoji-selector-pane">
        <EmojiList emojis={emojis} onEmojiClick={onEmojiClick} />
      </div>
    </div>
  );
}
