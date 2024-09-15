import "./EmojiList.css";

export type EmojiListProps = {
  emojis: Map<string, string[]>;
  onEmojiClick: (clickedEmoji: string) => void;
};

export default function EmojiList({ emojis, onEmojiClick }: EmojiListProps) {
  //send callback when 'enter' is pressed on emoji
  const handleEmojiEnter = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    //ignore non-enter key presses
    if(e.key != "Enter") {
      return;
    }

    const emojiElement = e.target as HTMLLabelElement;
    const emoji = emojiElement.innerText;

    onEmojiClick(emoji);
    emojiElement.blur();
  }

  //send callback when emoji is clicked
  const handleEmojiClick = (
    e: React.MouseEvent<HTMLLabelElement, MouseEvent>
  ) => {
    const emojiElement = e.target as HTMLLabelElement;
    const emoji = emojiElement.innerText

    onEmojiClick(emoji);
    emojiElement.blur();
  };

  return (
    <div className="emoji-list" tabIndex={-1}>
      {Array.from(emojis).map(([category, emojiList]) => (
        <div key={category}>
          <label>{category}</label>
          <div>
            {emojiList.map((emoji) => (
              <label key={emoji} onClick={handleEmojiClick} onKeyDown={handleEmojiEnter} tabIndex={0}>
                {emoji}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
