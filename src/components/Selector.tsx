import { useEffect, useRef, useState } from "react"

import "./Selector.css"

export default function Selector() {
  const selectorPaneRef = useRef<HTMLDivElement | null>(null);
  const checkboxRef = useRef<HTMLInputElement | null>(null);

  const [ selectorPaneVisible, setSelectorPaneVisible ] = useState(false);

  const handleCheckboxStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkbox = e.target as HTMLInputElement;
    setSelectorPaneVisible(checkbox.checked);
  }

  const handleSelectorPaneBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    //let checkbox handle the state change when it is the new focused element
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
