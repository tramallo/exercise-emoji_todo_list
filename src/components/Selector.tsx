import { useEffect, useRef, useState } from "react"

import "./Selector.css"

export default function Selector() {
  //reference selector-pane for programatic focus
  const selectorPaneRef = useRef<HTMLDivElement | null>(null);
  //const checkboxRef = useRef<HTMLInputElement | null>(null);
  
  const [ selectorPaneVisible, setSelectorPaneVisible ] = useState(false);

  const handleCheckboxStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkbox = e.target as HTMLInputElement;
    setSelectorPaneVisible(checkbox.checked);
  }

  /* const handleSelectorPaneBlur = () => {
    if (!!checkboxRef.current) {
      checkboxRef.current.click()
    }
  } */

  //autofocus selector-pane when render with selectorPaneVisible = true
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
      />
      <div
        className={`selector-pane ${selectorPaneVisible ? "visible" : ""}`}
        tabIndex={-1}
        ref={selectorPaneRef}
      >
        content content content content
      </div>
    </div>
  )
}
