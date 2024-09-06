import "./ComboBox.css";
import { useState } from "react";

/** -- ComboBox
 * One-liner input field that reveals a list of selectable options when focused.
 * The selected option will be a parameter of the onSelect() event callback func.
 *
 * @optionValues the list of selectable options (avoid empty "" strings)
 * @onSelect the event callback funcion fired when a list element is selected
 *  @placeholder a placeholder or label to display
 *  @allowCustomInput whether to allow the user to type a custom option
 *  @allowNullish whether to trigger the onSelect() event when user inputs an empty value (thru options provided by dev or typed)
 *
 * WARN: Empty option values ("") messes tab navigation as it doesnt show a component on screen,
 * but the empty component still exists and keeps tabbable.
 */
export type ComboBoxProps = {
  onSelect: (newValue: string) => void;
  optionValues: string[];
  options?: {
    placeholder?: string;
    allowCustomInput?: boolean;
    allowNullish?: boolean;
  };
};

export default function ComboBox({
  optionValues,
  onSelect,
  options,
}: ComboBoxProps) {
  const [selectedValue, setSelectedValue] = useState("");

  const inputFieldEnterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //ignore non-enter presses
    if (e.key != "Enter") {
      return;
    }

    //ignore nullish values when allowNullish = false
    if (!selectedValue && !options?.allowNullish) {
      return;
    }

    onSelect(selectedValue);
  };

  const optionClickHandler = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const optionContent = (e.target as HTMLLIElement).innerText;

    //ignore nullish values when allowNullish = false
    if (!optionContent && !options?.allowNullish) {
      return;
    }

    setSelectedValue(optionContent);
    onSelect(optionContent);
  };

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

    setSelectedValue(optionContent);
    onSelect(optionContent);
  };

  return (
    <div className="container">
      <input
        className="inputField"
        placeholder={options?.placeholder ?? ""}
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
        onKeyDown={inputFieldEnterHandler}
        readOnly={!options?.allowCustomInput}
      />
      {!optionValues.length ? undefined : (
        <ul className="optionsList">
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
