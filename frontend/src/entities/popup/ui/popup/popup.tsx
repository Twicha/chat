import { FC, ReactElement } from "react";
import "./popup.scss";

interface Props {
  title?: string;
  onClose?: () => void;
}

export const Popup: FC<Props> = ({ title, children }): ReactElement => {
  return (
    <div className="base-popup">
      <div className="base-popup__container">
        {title && <h2 className="base-popup__title">{title}</h2>}
        <div className="base-popup__content">{children}</div>
      </div>
    </div>
  );
};
