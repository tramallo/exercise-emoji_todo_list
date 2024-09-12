import { useState } from "react";

import "./EmojiSelector.css";
import { emojis } from "../utils/emojis";

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
  const onEmojiClick = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    const target = e.target as HTMLLabelElement;

    setSelectedEmoji(target.innerText);
    onSelect(target.innerText);
    target.blur();
  };

  return (
    <div className="emoji-selector">
      <button>{selectedEmoji}</button>
      <div className="emoji-selector-pane">
        {Array.from(emojis).map(([category, emojiList]) => (
          <div key={category} className="emoji-selector-category">
            <label>{category}</label>
            <div>
              {emojiList.map((emoji, index) => (
                <label key={index} tabIndex={0} onClick={onEmojiClick}>
                  {emoji}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
