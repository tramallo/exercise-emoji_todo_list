import "./ComboBox.css";
import { useState } from "react";

/** -- ComboBox
 * One-liner input field that reveals a list of selectable options when focused.
 * The selected option will be a parameter of the onSelect() event callback func.
 *
 * @className a custom class name for this ComboBox (used to style each instance separately)
 * @optionValues the list of selectable options (avoid empty "" strings)
 * @onSelect the event callback funcion fired when a list element is selected
 *  @placeholder a placeholder or label to display
 *  @allowCustomInput whether to allow the user to type a custom option
 *  @allowNullish whether to trigger the onSelect() event when user inputs an empty value (thru options provided by dev or typed)
 *
 * NOTE: Default style is customizable by styiling the .combobox class
 * WARN: Empty option values ("") messes tab navigation as it doesnt show a component on screen,
 * but the empty component still exists and keeps tabbable.
 */
export type ComboBoxProps = {
  className?: string;
  onSelect: (selectedValue: string) => void;
  optionValues: string[];
  options?: {
    placeholder?: string;
    allowCustomInput?: boolean;
    allowNullish?: boolean;
  };
};

export default function ComboBox({
  className,
  optionValues,
  onSelect,
  options,
}: ComboBoxProps) {
  const [selectedValue, setSelectedValue] = useState("");

  //when pressing 'enter' in the input field
  const inputFieldEnterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //ignore non-enter presses
    if (e.key != "Enter") {
      return;
    }

    //ignore nullish values when allowNullish = false
    if (!selectedValue && !options?.allowNullish) {
      return;
    }

    //close list by releasing focus
    const inputElement = e.target as HTMLInputElement;
    inputElement.blur();

    onSelect(selectedValue);
  };

  //when clicking on list option
  const optionClickHandler = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const optionContent = (e.target as HTMLLIElement).innerText;

    //ignore nullish values when allowNullish = false
    if (!optionContent && !options?.allowNullish) {
      return;
    }

    //close list by releasing focus
    const inputElement = e.target as HTMLInputElement;
    inputElement.blur();

    setSelectedValue(optionContent);
    onSelect(optionContent);
  };

  //when option has focus and 'enter' is pressed
  const optionEnterHandler = (e: React.KeyboardEvent<HTMLLIElement>) => {
    //ignore non-enter presses
    if (e.key != "Enter") {
      return;
    }

    const optionContent = (e.target as HTMLLIElement).innerText;

    //ignore nullish values when allowNullish = false
    if (!optionContent && !options?.allowNullish) {
      return;
    }

    //close list by releasing focus
    const inputElement = e.target as HTMLInputElement;
    inputElement.blur();

    setSelectedValue(optionContent);
    onSelect(optionContent);
  };

  return (
    <div className={`combobox ${className ?? ""}`}>
      <input
        placeholder={options?.placeholder ?? ""}
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
        onKeyDown={inputFieldEnterHandler}
        readOnly={!options?.allowCustomInput}
      />
      {!optionValues.length ? undefined : (
        <ul>
          {optionValues.map((opValue, index) => (
            <li
              key={index}
              tabIndex={0}
              onClick={optionClickHandler}
              onKeyDown={optionEnterHandler}
            >
              {opValue}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
