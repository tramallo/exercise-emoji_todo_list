import { useEffect, useState } from "react";
import { getAllEmojis } from "../utils/emojis";

export default function EmojiSelector() {
  const [emojiList, setEmojis] = useState<string[]>([]);
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");

  //load all emojis
  useEffect(() => {
    setEmojis(getAllEmojis());
  }, []);

  return (
    <div style={{ display: "inline-block", padding: "1%" }}>
      <button>X</button>
      <div>{emojiList}</div>
    </div>
  );
}
