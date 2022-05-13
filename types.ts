export interface Message {
  id: string;
  userId: string;
  chatId: string;
  text: string;
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  firstname?: string;
  phone: string;
  avatarUrl?: string;
}

export interface Chat {
  id: string;
  users: string[];
  createdAt: string;
}

export enum EChatEvt {
  JOIN = "join",
  LEAVE = "leave",
  POST_NEW_MESSAGE = "post-new-message",
  NEW_MESSAGE_ADDED = "new-message-added",
  SHARE_ROOMS = "share-rooms",
  ADD_PEER = "add-peer",
  REMOVE_PEER = "remove-peer",
  RELAY_SDP = "relay-sdp",
  RELAY_ICE = "relay-ice",
  ICE_CANDIDATE = "ice-candidate",
  SESSION_DESCRIPTION = "session-description",
}
