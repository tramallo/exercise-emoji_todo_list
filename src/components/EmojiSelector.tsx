import { useEffect, useRef, useState } from "react"

import "./EmojiSelector.css"
import { emojis, getEmoji, EmojiReference } from "../utils/emojis";

export type EmojiSelectorProps = {
  className?: string;
  selected: EmojiReference;
  onSelect: (selected: EmojiReference) => void;
  closeOnSelect?: boolean;
}

export default function EmojiSelector({ selected, onSelect, closeOnSelect, className }: EmojiSelectorProps) {
  const checkboxLabelRef = useRef<HTMLLabelElement | null>(null);
  const selectorPaneRef = useRef<HTMLDivElement | null>(null);
  const selectedEmojiRef = useRef<HTMLSpanElement | null>(null);

  const [ selectorPaneVisible, setSelectorPaneVisible ] = useState(false);

  const selectEmoji = (emoji: EmojiReference) => {
    onSelect(emoji);

    if(closeOnSelect) {
      setSelectorPaneVisible(false);
    }
  }

  const handleCheckboxStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkbox = e.target as HTMLInputElement;
    setSelectorPaneVisible(checkbox.checked);  
  }

  //selectorPane closes when loses focus
  const handleEmojiBlur = (e: React.FocusEvent<HTMLSpanElement>) => {
    const newFocusedElement = e.relatedTarget;

    if (newFocusedElement == checkboxLabelRef.current) {
      return;
    }

    if (!selectorPaneRef.current) {
      return;
    }

    if (selectorPaneRef.current.contains(newFocusedElement)) {
      //non-emoji elements within selectorPane doesnt accept focus
      if (newFocusedElement && newFocusedElement.tagName != "SPAN") {
        const prevFocusedElement = e.target as HTMLElement;
        prevFocusedElement.focus();
      }

      return;
    }

    setSelectorPaneVisible(false);
  }

  //autofocus selected emoji when selectorPane opens
  useEffect(() => {
    if (selectorPaneVisible && selectedEmojiRef.current) {
      selectedEmojiRef.current.focus();
    }
  }, [selectorPaneVisible])

  //TODO: check if input can be focused by tab navigation
  return (
    <div className={`emoji-selector ${className ?? ""}`}>
      <label tabIndex={0} ref={checkboxLabelRef}>
        <input 
          type="checkbox"
          checked={selectorPaneVisible}
          onChange={handleCheckboxStateChange} 
        />
        {getEmoji(selected) ?? "X"}
      </label>
      <div 
        className={`selector-pane ${selectorPaneVisible ? "visible" : ""}`} 
        ref={selectorPaneRef}
      >
        {Array.from(emojis).map( ([category, emojiList]) =>
          <div className="category-pane" key={category} tabIndex={-1}>
            <label tabIndex={-1}>{category}</label>
            {emojiList.map( (emoji, emojiIndex) =>
              <span
                className={ selected.category == category && selected.emojiIndex == emojiIndex ? "active" : ""}
                tabIndex={0}
                onClick={() => selectEmoji({ category, emojiIndex })}
                onBlur={handleEmojiBlur}
                ref={category == selected.category && emojiIndex == selected.emojiIndex ? selectedEmojiRef : undefined}
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
