import { sample } from "effector";
import { chatsDomain } from "./domain";

// Stores

export const $selectedChatId = chatsDomain.createStore<string | null>(null);

// Events

export const setSelectedChatId = chatsDomain.createEvent<string | null>();

// Logic

sample({ clock: setSelectedChatId, target: $selectedChatId });
