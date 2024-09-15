import "./ComboboxInput.css";
import { useState } from "react";

/** -- ComboBox
 * One-liner input field that reveals a list of selectable options when focused.
 * The selected option will be a parameter of the onSelect() event callback func.
 *
 * @className a custom class name for this ComboBox (used to style each instance separately)
 * @suggestions the list of selectable options (avoid empty "" strings)
 * @onSelect the event callback funcion fired when a list element is selected
 * @defaultValue value set on initial draw (onSelect is called with this value on init, when provided)
 * @placeholder a placeholder to display in the field
 * @options -->
 *  @allowCustomInput whether to allow the user to type a custom value
 *  @allowNullish whether to trigger the onSelect() event when user inputs an empty value
 *
 * NOTE: Default style is customizable by styiling the .combobox class
 * WARN: Empty option values ("") messes tab navigation as it doesnt show a component on screen,
 * but the empty component still exists and keeps tabbable.
 */
export type ComboboxInputProps = {
  className?: string;
  onSelect: (selectedValue: string) => void;
  defaultValue?: string;
  suggestions?: string[];
  placeholder?: string;
  options?: {
    allowCustomInput?: boolean;
    allowNullish?: boolean;
  };
};

export default function ComboboxInput({
  className,
  suggestions,
  onSelect,
  defaultValue,
  placeholder,
  options,
}: ComboboxInputProps) {
  const [lastValidValue, setLastValidValue] = useState(defaultValue ?? "");
  const [currentValue, setCurrentValue] = useState(defaultValue ?? "");

  //trigger callback on init if defaultValue is provided
  if (defaultValue && currentValue == defaultValue) {
    onSelect(defaultValue);
  }

  //when input field loses focus
  const inputFieldBlur = () => {
    //ignore nullish values when allowNullish = false
    if (!currentValue && !options?.allowNullish) {
      setCurrentValue(lastValidValue);
      return;
    }

    setLastValidValue(currentValue);
    onSelect(currentValue);
  };

  //when pressing 'enter' in the input field
  const inputFieldEnterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //ignore non-enter presses
    if (e.key != "Enter") {
      return;
    }

    //ignore nullish values when allowNullish = false
    if (!currentValue && !options?.allowNullish) {
      setCurrentValue(lastValidValue);
      return;
    }

    //close list by releasing focus
    const inputElement = e.target as HTMLInputElement;
    inputElement.blur();

    setLastValidValue(currentValue);
    onSelect(currentValue);
  };

  //when clicking on list option
  const optionClickHandler = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const target = e.target as HTMLLIElement;
    const selectedValue = target.innerText;

    //ignore nullish values when allowNullish = false
    if (!selectedValue && !options?.allowNullish) {
      return;
    }

    //close list by releasing focus
    target.blur();

    setLastValidValue(selectedValue);
    setCurrentValue(selectedValue);
    onSelect(selectedValue);
  };

  //when option has focus and 'enter' is pressed
  const optionEnterHandler = (e: React.KeyboardEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    const selectedValue = target.innerText;

    //ignore non-enter presses
    if (e.key != "Enter") {
      return;
    }

    //ignore nullish values when allowNullish = false
    if (!selectedValue && !options?.allowNullish) {
      return;
    }

    //close list by releasing focus
    target.blur();

    setLastValidValue(selectedValue);
    setCurrentValue(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <div className={`combobox-input ${className ?? ""}`}>
      <input
        placeholder={placeholder}
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        onKeyDown={inputFieldEnterHandler}
        onBlur={inputFieldBlur}
        readOnly={!options?.allowCustomInput}
      />
      {suggestions && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              tabIndex={0}
              onClick={optionClickHandler}
              onKeyDown={optionEnterHandler}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
