import { useEffect, useRef, useState } from "react"

import "./EmojiSelector.css"
import { emojis } from "../utils/emojis";

export type EmojiSelectorProps = {
  onSelect: (selected: string) => void;
  defaultValue: string;
}

export default function EmojiSelector({ onSelect, defaultValue }: EmojiSelectorProps) {
  const checkboxLabelRef = useRef<HTMLLabelElement | null>(null);
  const selectorPaneRef = useRef<HTMLDivElement | null>(null);
  const firstEmojiRef = useRef<HTMLSpanElement | null>(null);

  const [ selectedEmoji, setSelectedEmoji ] = useState(defaultValue);
  const [ selectorPaneVisible, setSelectorPaneVisible ] = useState(false);

  const handleCheckboxStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkbox = e.target as HTMLInputElement;
    setSelectorPaneVisible(checkbox.checked);  
  }

  const handleEmojiClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const emojiSpan = e.target as HTMLSpanElement;
    const emoji = emojiSpan.innerText;

    setSelectedEmoji(emoji);
    onSelect(emoji);
  }

  //selectorPane closes when loses focus
  const handleEmojiBlur = (e: React.FocusEvent<HTMLSpanElement>) => {
    const newSelectedElement = e.relatedTarget;

    if (newSelectedElement == checkboxLabelRef.current) {
      return;
    }

    if (!selectorPaneRef.current) {
      return;
    }

    if (selectorPaneRef.current.contains(newSelectedElement)) {
      //non-emoji elements within selectorPane doesnt accept focus
      if (newSelectedElement && newSelectedElement.tagName != "SPAN") {
        const prevSelectedElement = e.target as HTMLElement;
        prevSelectedElement.focus();
      }

      return;
    }

    setSelectorPaneVisible(false);
  }

  //autofocus first emoji when selectorPane opens
  useEffect(() => {
    if (selectorPaneVisible && firstEmojiRef.current) {
      firstEmojiRef.current.focus();
    }
  }, [selectorPaneVisible])

  //TODO: check if input can be focused by tab navigation
  return (
    <div className="emoji-selector">
      <label tabIndex={0} ref={checkboxLabelRef}>
        <input 
          type="checkbox"
          checked={selectorPaneVisible}
          onChange={handleCheckboxStateChange} 
        />
        {selectedEmoji}
      </label>
      <div 
        className={`selector-pane ${selectorPaneVisible ? "visible" : ""}`} 
        ref={selectorPaneRef}
      >
        {Array.from(emojis).map( ([category, emojiList], categoryIndex) =>
          <div className="category-pane" key={category} tabIndex={-1}>
            <label tabIndex={-1}>{category}</label>
            {emojiList.map( (emoji, emojiIndex) =>
              <span
                tabIndex={0}
                onClick={handleEmojiClick}
                onBlur={handleEmojiBlur}
                ref={!categoryIndex && !emojiIndex ? firstEmojiRef : undefined}
                key={emojiIndex}
              >
                {emoji}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
