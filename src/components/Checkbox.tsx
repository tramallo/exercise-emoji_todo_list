import { useState } from "react";

import "./Checkbox.css";

export type CheckboxProps = {
  className?: string;
  label: string;
  labelChecked?: string;
  defaultState?: boolean;
  onStateChange?: (newState: boolean) => void;
}

export default function Checkbox({ className, label, labelChecked, defaultState, onStateChange }: CheckboxProps) {
  const [ checked, setChecked ] = useState<boolean>(!!defaultState);

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkbox = e.target as HTMLInputElement

    setChecked(checkbox.checked)

    if (onStateChange) {
      onStateChange(checkbox.checked)
    }
  }

  return (
    <label className={`checkbox ${className ?? ""}`} tabIndex={0}>
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={handleStateChange} 
        tabIndex={-1}
      />
      { checked ? (labelChecked ?? label) : label }
    </label>
  )
}
