import { debounce } from "patronum";

import { sample } from "effector";

import { popupDomain } from "./domain";

import {
  EPopupName,
  IAllPopupClosePayload,
  IPopupClosePayload,
  IPopupOpenPayload,
} from "./types";

import {
  openPopupHandler,
  showPopupHandler,
  closePopupHandler,
  closeAllPopupHandler,
  hidePopupHandler,
  hideAllPopupHandler,
} from "../lib";

// Stores

export const $activePopup = popupDomain.createStore<EPopupName[]>([]);

export const $showedPopup = popupDomain.createStore<EPopupName[]>([]);

// Events

export const openPopup = popupDomain.createEvent<IPopupOpenPayload>();

export const closePopup = popupDomain.createEvent<IPopupClosePayload>();

export const closeAllPopup = popupDomain.createEvent<IAllPopupClosePayload>();

const hidePopup = popupDomain.createEvent<IPopupClosePayload>();

const hideAllPopup = popupDomain.createEvent<IAllPopupClosePayload>();

// Logic

sample({
  clock: openPopup,
  source: $activePopup,
  fn: openPopupHandler,
  target: $activePopup,
});

sample({
  clock: openPopup,
  source: $showedPopup,
  fn: showPopupHandler,
  target: $showedPopup,
});

sample({
  clock: closePopup,
  source: $showedPopup,
  fn: closePopupHandler,
  target: $showedPopup,
});

sample({
  clock: closeAllPopup,
  fn: closeAllPopupHandler,
  target: $showedPopup,
});

sample({
  clock: hidePopup,
  source: $activePopup,
  fn: hidePopupHandler,
  target: $activePopup,
});

sample({
  clock: hideAllPopup,
  fn: hideAllPopupHandler,
  target: $activePopup,
});

debounce({
  source: closePopup,
  timeout: 800,
  target: hidePopup,
});

debounce({
  source: closeAllPopup,
  timeout: 800,
  target: hideAllPopup,
});
