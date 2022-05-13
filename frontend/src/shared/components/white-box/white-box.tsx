import classNames from "classnames";
import { FC, ReactElement } from "react";
import "./white-box.scss";

interface Props {
  className?: string;
  withoutPadding?: boolean;
}

export const WhiteBox: FC<Props> = ({
  className,
  withoutPadding,
  children,
}): ReactElement => {
  return (
    <div
      className={classNames("white-box", className, {
        "white-box--without-padding": withoutPadding,
      })}
    >
      {children}
    </div>
  );
};
