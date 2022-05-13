import { getFormattedDate } from "shared/helpers/getFormattedDate";
import { Message } from "../../../../../types";
import { IMessagesByDay } from "../model/types";

export const getMessagesByDayAdapter = (
  messages: Message[] | null
): IMessagesByDay[] => {
  if (!messages) {
    return [];
  }

  const dates = messages.reduce((final: string[], { createdAt }) => {
    const date = getFormattedDate(createdAt, "MM/dd/yyyy");

    if (!final.includes(date)) {
      final.push(date);
    }

    return final;
  }, []);

  return dates.map((date) => {
    const filteredMessages = messages.filter(
      ({ createdAt }) => date === getFormattedDate(createdAt, "MM/dd/yyyy")
    );

    return {
      date: date,
      messages: filteredMessages,
    };
  });
};
