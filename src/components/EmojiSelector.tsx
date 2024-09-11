import { useEffect, useState } from "react";
import { getAllEmojis } from "../utils/emojis";

export default function EmojiSelector() {
  const [emojiList, setEmojis] = useState<string[]>([]);
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");

  const onEmojiClick = (e) => {
    alert(e.target.innerText);
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
      <button>X</button>
      <div>
        {emojiList.map((emoji) => (
          <label
            style={{
              padding: "2px",
              boxSizing: "border-box",
            }}
            onClick={onEmojiClick}
          >
            {emoji}
          </label>
        ))}
      </div>
    </div>
  );
}
