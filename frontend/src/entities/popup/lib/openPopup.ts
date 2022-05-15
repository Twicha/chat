import { EPopupName, IPopupOpenPayload } from "../model/types";

export const openPopupHandler = (
  activePopup: EPopupName[],
  { name }: IPopupOpenPayload
) => {
  const hasThisPopup: boolean = activePopup.includes(name);

  if (hasThisPopup) {
    return [...activePopup.filter((popup) => popup !== name), name];
  }

  return [...activePopup, name];
};

export const showPopupHandler = (
  showedPopup: EPopupName[],
  { name }: IPopupOpenPayload
) => {
  !showedPopup.length && document.body.classList.add("overflow-hidden");

  const hasThisPopup: boolean = showedPopup.includes(name);

  if (hasThisPopup) {
    return [...showedPopup.filter((popup) => popup !== name), name];
  }

  return [...showedPopup, name];
};
