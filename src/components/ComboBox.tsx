import "./ComboBox.css";
import { useState } from "react";

/** -- ComboBox
 * One-liner input field that reveals a list of selectable options when focused.
 * The selected option will be a parameter of the onSelect() event callback func.
 *
 * @optionValues the list of selectable options
 * @onSelect the event callback funcion fired when a list element is selected
 *  @placeholder a placeholder or label to display
 *  @allowCustomInput whether to allow the user to type a custom option
 *  @allowNullish whether to trigger the onSelect() event when user inputs an empty value (thru options provided by dev or typed)
 */
export type ComboBoxProps = {
  optionValues: string[];
  onSelect: (newValue: string) => void;
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
        disabled={!(options?.allowCustomInput ?? true)}
      />
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
    </div>
  );
}
