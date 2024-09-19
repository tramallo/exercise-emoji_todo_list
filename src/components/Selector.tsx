import { useEffect, useRef, useState } from "react"

import "./Selector.css"

export default function Selector() {
  const selectorPaneRef = useRef<HTMLDivElement | null>(null);
  const checkboxRef = useRef<HTMLInputElement | null>(null);

  const [ selectorPaneVisible, setSelectorPaneVisible ] = useState(false);

  //update local state when checkbox changes
  const handleCheckboxStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkbox = e.target as HTMLInputElement;
    setSelectorPaneVisible(checkbox.checked);
  }

  //close selectorPane when it blurs
  const handleSelectorPaneBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    //except when checkbox is clicked, in that case let checkbox handle it
    if (e.relatedTarget == checkboxRef.current) {
      return;
    }

    setSelectorPaneVisible(false);
  }

  //autofocus selector-pane when rendering with selectorPaneVisible = true
  useEffect(() => {
    if (selectorPaneVisible && !!selectorPaneRef.current) {
      selectorPaneRef.current.focus();
    }
  }, [selectorPaneVisible])

  return (
    <div className="selector">
      <input 
        type="checkbox"
        checked={selectorPaneVisible}
        onChange={handleCheckboxStateChange} 
        ref={checkboxRef}
      />
      <div
        className={`selector-pane ${selectorPaneVisible ? "visible" : ""}`}
        onBlur={handleSelectorPaneBlur}
        tabIndex={-1}
        ref={selectorPaneRef}
      >
        content content content content
      </div>
    </div>
  )
}
