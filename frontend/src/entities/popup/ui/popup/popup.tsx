import {
  FC,
  Fragment,
  MouseEvent,
  ReactElement,
  useCallback,
  useMemo,
} from "react";

import { useStore } from "effector-react";

import classNames from "classnames";

import { popupModel, EPopupName } from "entities/popup";

import "./popup.scss";

interface Props {
  name: EPopupName;
  title?: string;
  onClose?: () => void;
  isWithCloseBtn?: boolean;
}

const { closePopup, $showedPopup, $activePopup } = popupModel;

export const Popup: FC<Props> = ({
  name,
  title,
  children,
  isWithCloseBtn,
  onClose,
}): ReactElement => {
  const showedPopup = useStore($showedPopup);

  const activePopup = useStore($activePopup);

  const isThisPopupShowed: boolean = useMemo(
    () => showedPopup.includes(name),
    [showedPopup, name]
  );

  const isThisPopupActive: boolean = useMemo(
    () => activePopup.includes(name),
    [activePopup, name]
  );

  const onCloseHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();

      onClose && onClose();

      closePopup({ name });
    },
    [onClose, name]
  );

  return (
    <Fragment>
      {isThisPopupActive && (
        <div
          className={classNames("popup", {
            "popup--showed": isThisPopupShowed,
          })}
        >
          <button
            className="popup__backdrop"
            type="button"
            onMouseDown={onCloseHandler}
          />
          <div
            className={classNames("popup__container", {
              "popup__container--showed": isThisPopupShowed,
            })}
          >
            {title && (
              <div
                className={classNames("popup__header", {
                  "popup__header--with-close-btn": isWithCloseBtn,
                })}
              >
                <h2 className="popup__title">{title}</h2>
                {isWithCloseBtn && (
                  <button
                    type="button"
                    className="popup__close"
                    onClick={onCloseHandler}
                  >
                    x
                  </button>
                )}
              </div>
            )}
            <div className="popup__content">{children}</div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
