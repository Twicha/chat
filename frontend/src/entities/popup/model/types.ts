export enum EPopupName {
  CONVERSATION = "conversation",
  ADD_CONTACT = "add-contact",
}

export interface IPopupOpenPayload {
  name: EPopupName;
}

export interface IPopupClosePayload {
  name: EPopupName;
  callback?: () => void;
}

export interface IAllPopupClosePayload {
  callback?: () => void;
}
