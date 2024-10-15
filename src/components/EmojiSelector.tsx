import { useEffect, useRef, useState } from "react"

import "./EmojiSelector.css"
import { emojis } from "../utils/emojis";

export type EmojiSelectorProps = {
  className?: string;
  selected: string;
  onSelect: (selected: string) => void;
  closeOnSelect?: boolean;
}

export default function EmojiSelector({ selected, onSelect, closeOnSelect, className }: EmojiSelectorProps) {
  const checkboxLabelRef = useRef<HTMLLabelElement | null>(null);
  const selectorPaneRef = useRef<HTMLDivElement | null>(null);
  const selectedEmojiRef = useRef<HTMLSpanElement | null>(null);

  const [ selectorPaneVisible, setSelectorPaneVisible ] = useState(false);

  const selectEmoji = (emoji: string) => {
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

  
  const handleEnter = (e) => {
    if (e.key != "Enter") {
      return
    }

    setSelectorPaneVisible(!selectorPaneVisible)
  }

  //autofocus selected emoji when selectorPane opens
  useEffect(() => {
    if (selectorPaneVisible && selectedEmojiRef.current) {
      selectedEmojiRef.current.focus();
    }
  }, [selectorPaneVisible])

  return (
    <div className={`emoji-selector ${className ?? ""}`}>
      <label tabIndex={0} onKeyDown={(e) => handleEnter(e)} ref={checkboxLabelRef}>
        <input 
          type="checkbox"
          checked={selectorPaneVisible}
          onChange={handleCheckboxStateChange}
          tabIndex={-1}
        />
        {selected ?? "😀"}
      </label>
      <div 
        className={`selector-pane ${selectorPaneVisible ? "visible" : ""}`} 
        ref={selectorPaneRef}
      >
        {Array.from(emojis).map( ([category, emojiList]) =>
          <>
            <label tabIndex={-1}>{category}</label>
            <div className="category-pane" key={category} tabIndex={-1}>
              {emojiList.map( (emoji, emojiIndex) =>
                <span
                  key={emojiIndex}
                  className={`${emoji == selected ? "active" : ""}`}
                  onClick={() => selectEmoji(emoji)}
                  onBlur={handleEmojiBlur}
                  ref={emoji == selected ? selectedEmojiRef : undefined}
                  tabIndex={0}
                >
                  {emoji}
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
