import "./EmojiList.css"

export type EmojiListProps = {
  emojis: Map<string, string[]>
  onEmojiClick: (clickedEmoji: string) => void
}

export default function EmojiList({emojis, onEmojiClick}: EmojiListProps) {

  const handleEmojiClick = (e) => {
    const target = e.target as HTMLLabelElement

    onEmojiClick(target.innerText)
    target.blur()
  }


  return (
    <div className="emoji-list">
      {Array.from(emojis).map( ([category, emojiList]) => (
        <div>
          <label>{category}</label>
          <div>
            {emojiList.map((emoji) => (
              <label onClick={handleEmojiClick} tabIndex={0}>{emoji}</label>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
