import { sample } from "effector";
import { messagesEntitiesModel } from "entities/messages";
import { getMessagesByDayAdapter } from "../lib/getMessagesByDayAdapter";
import { messagesFeaturesDomain } from "./domain";
import { IMessagesByDay } from "./types";

const { $messages } = messagesEntitiesModel;

// Stores

export const $messagesByDay = messagesFeaturesDomain.createStore<
  IMessagesByDay[] | null
>(null);

// Logic

sample({
  clock: $messages,
  fn: getMessagesByDayAdapter,
  target: $messagesByDay,
});
