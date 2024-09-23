import "./ComboboxInput.css";
import { useEffect, useRef, useState } from "react";

/** -- ComboboxInput
 * One-liner input field that reveals a list of selectable options when focused.
 * The selected option will be a parameter of the onSelect() event.
 *
 * @className a custom class name for this ComboBox (used to style each instance individually)
 * @suggestions the list of selectable options (avoid empty "" strings)
 * @value the current value to display, used to control the value from parent or as default value setter
 * @onSelect the event callback funcion fired when a value is selected (thru list or custom input)
 * @placeholder a placeholder to display in the field
 * @allowCustomInput whether to allow the user to type a custom value
 * @allowNullishInput whether to trigger the onSelect() event when user inputs/selects an empty value
 *
 * WARN: Empty suggestion values ("") messes tab navigation as it doesnt show a component on screen,
 * but the empty component still exists and remains tabbable.
 */
export type ComboboxInputProps = {
  value: string;
  onSelect: (value: string) => void;
  suggestions?: string[];
  placeholder?: string;
  allowCustomInput?: boolean;
  allowNullishInput?: boolean;
  className?: string;
};

export default function ComboboxInput({
  value,
  onSelect,
  suggestions,
  placeholder,
  allowCustomInput,
  allowNullishInput,
  className
}: ComboboxInputProps) {
  const inputFieldRef = useRef<HTMLInputElement | null>(null);

  const [lastValue, setLastValue] = useState(value);

  //send callback when input field unfocus
  const handleInputFieldBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputField = e.target as HTMLInputElement;
    const currentValue = inputField.value;

    if (!currentValue && !allowNullishInput) {
      inputField.value = lastValue;
      return;
    }

    setLastValue(currentValue);
    onSelect(currentValue);
  }

  //send callback when 'enter' is pressed on input field
  const handleInputFieldEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key != "Enter") {
      return;
    }

    const inputField = e.target as HTMLInputElement;
    const currentValue = inputField.value;

    if (!currentValue && !allowNullishInput) {
      inputField.value = lastValue;
      return;
    }

    //blur event handler sends the callback
    inputField.blur();
  };

  //send callback when clicked on suggestion
  const handleSuggestionClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const suggestionElement = e.target as HTMLLIElement;
    const suggestionValue = suggestionElement.innerText;

    if (!suggestionValue && !allowNullishInput) {
      suggestionElement.blur();
      return;
    }

    setLastValue(suggestionValue);
    onSelect(suggestionValue);

    suggestionElement.blur();
  };

  //send calback when 'enter' is pressed on suggestion
  const handleSuggestionEnter = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key != "Enter") {
      return;
    }

    const suggestionElement = e.target as HTMLLIElement;
    const suggestionValue = suggestionElement.innerText;

    if (!suggestionValue && !allowNullishInput) {
      return;
    }

    setLastValue(suggestionValue);
    onSelect(suggestionValue);

    suggestionElement.blur();
  };

  //set current value on-render to avoid controlled input
  useEffect(() => {
    const inputField = inputFieldRef.current;
    if (!inputField) {
      console.error("input field reference is null");
      return;
    }

    inputField.value = value;
  }, [value])

  return (
    <div className={`combobox-input ${className ?? ""}`}>
      <input 
        onKeyDown={handleInputFieldEnter}
        onBlur={handleInputFieldBlur}
        readOnly={!allowCustomInput}
        placeholder={placeholder}
        ref={inputFieldRef}
      />
      {suggestions && suggestions.length != 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              tabIndex={0}
              onClick={handleSuggestionClick}
              onKeyDown={handleSuggestionEnter}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
