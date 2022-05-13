import { messagesEntitiesDomain } from "./domain";
import { $messages } from "./messages";

// Events

export const resetMessages = messagesEntitiesDomain.createEvent();

// Logic

$messages.reset(resetMessages);
