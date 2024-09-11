import { useEffect, useState } from "react";

import "./EmojiSelector.css"
import { getAllEmojis } from "../utils/emojis";

export type EmojiSelectorProps = {
  onSelect: (selectedEmoji: string) => void
}

export default function EmojiSelector({onSelect}: EmojiSelectorProps) {
  const [emojiList, setEmojis] = useState<string[]>([]);
  const [selectedEmoji, setSelectedEmoji] = useState<string | undefined>(undefined);

  const onEmojiClick = (e) => {
    setSelectedEmoji(e.target.innerText)
    onSelect(e.target.innerText)
    e.target.blur()
  };

  //TODO: useMemo to optimize
  //load emojiList on start
  useEffect(() => {
    setEmojis(getAllEmojis());
  }, []);

  return (
    <div
      className="emoji-selector"
      style={{ display: "inline-block", padding: "1%" }}
    >
      <button>{selectedEmoji ?? "X"}</button>
      <div>
        {emojiList.map((emoji) => (
          <label
            style={{
              padding: "2px",
              boxSizing: "border-box",
            }}
            onClick={onEmojiClick}
            tabIndex={0}
          >
            {emoji}
          </label>
        ))}
      </div>
    </div>
  );
}
