import { createDomain, sample } from "effector";
import { getMessages, GetMessagesQueryParams } from "shared/api/messages";
import { Message } from "../../../../../types";
import { messagesEntitiesDomain } from "./domain";

// Stores

export const $messages = messagesEntitiesDomain.createStore<Message[] | null>(
  null
);

export const $isLoading = messagesEntitiesDomain.createStore<boolean>(false);

// Events

export const fetchMessages =
  messagesEntitiesDomain.createEvent<GetMessagesQueryParams>();

export const setMessages = messagesEntitiesDomain.createEvent<Message>();

// Effects

export const fetchMessagesFx = messagesEntitiesDomain.createEffect(getMessages);

// Logic

sample({
  clock: fetchMessages,
  target: fetchMessagesFx,
});

sample({ clock: fetchMessagesFx.pending, target: $isLoading });

sample({ clock: fetchMessagesFx.doneData, target: $messages });

sample({
  clock: setMessages,
  source: $messages,
  fn: (prevMessages, newMessage) =>
    prevMessages ? [...prevMessages, newMessage] : [newMessage],
  target: $messages,
});
