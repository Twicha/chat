import { sample } from "effector";
import { getChats } from "shared/api/chats";
import { GetChatsQueryParams } from "shared/api/chats/model/query";
import { Chat } from "../../../../../types";
import { chatsDomain } from "./domain";

// Stores

export const $chats = chatsDomain.createStore<Chat[]>([]);

export const $loading = chatsDomain.createStore<boolean>(false);

// Events

export const fetchChats = chatsDomain.createEvent<GetChatsQueryParams>();

// Effects

export const fetchChatsFx = chatsDomain.createEffect(getChats);

// Logic

sample({
  clock: fetchChats,
  target: fetchChatsFx,
});

sample({
  clock: fetchChatsFx.pending,
  fn: (loading) => loading,
  target: $loading,
});

sample({
  clock: fetchChatsFx.doneData,
  fn: (chats) => chats,
  target: $chats,
});
