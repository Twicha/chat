import {
  EPopupName,
  IAllPopupClosePayload,
  IPopupClosePayload,
} from "../model/types";

export const closePopupHandler = (
  showedPopup: EPopupName[],
  { name, callback }: IPopupClosePayload
) => {
  showedPopup.length === 1 && document.body.classList.remove("overflow-hidden");

  callback && callback();

  return showedPopup.filter((popup) => popup !== name);
};

export const closeAllPopupHandler = ({ callback }: IAllPopupClosePayload) => {
  document.body.classList.remove("overflow-hidden");

  callback && callback();

  return [];
};

export const hidePopupHandler = (
  activePopup: EPopupName[],
  { name }: IPopupClosePayload
) => activePopup.filter((popup) => popup !== name);

export const hideAllPopupHandler = () => [];
