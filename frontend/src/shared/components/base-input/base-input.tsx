import classNames from "classnames";
import { ChangeEvent, FC, InputHTMLAttributes, ReactElement } from "react";
import "./base-input.scss";

export interface InputChangePayload {
  value: string;
  name?: string;
}

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value: string;
  onChange: (payload: InputChangePayload) => void;
}

export const BaseInput: FC<Props> = ({
  placeholder,
  value,
  name,
  onChange,
}): ReactElement => {
  const isCollapsed: boolean = !!value.trim();

  const onChangeHandler = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;

    onChange({ value, name });
  };

  return (
    <label className="base-input">
      <input
        className={classNames("base-input__field", {
          "base-input__field--collapsed": isCollapsed,
        })}
        onChange={onChangeHandler}
      />
      <span className="base-input__label">{placeholder}</span>
    </label>
  );
};
