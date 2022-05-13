import { popupDomain } from "./domain";
import { EPopupName, IPopupOpenPayload } from "./types";
import { debounce } from "patronum";
import { sample } from "effector";

// Stores

export const $activePopup = popupDomain.createStore<EPopupName | null>(null);

export const $isShowed = popupDomain.createStore<boolean>(false);

// Events

export const openPopup = popupDomain.createEvent<IPopupOpenPayload>();

export const closePopup = popupDomain.createEvent();

const hidePopup = popupDomain.createEvent();

// Logic

sample({
  clock: openPopup,
  fn: ({ name }) => name,
  target: $activePopup,
});

sample({
  clock: openPopup,
  fn: () => {
    document.body.classList.add("overflow-hidden");

    return true;
  },
  target: $isShowed,
});

sample({
  clock: closePopup,
  fn: () => {
    document.body.classList.remove("overflow-hidden");

    return false;
  },
  target: $isShowed,
});

sample({ clock: hidePopup, fn: () => null, target: $activePopup });

debounce({
  source: closePopup,
  timeout: 800,
  target: hidePopup,
});
