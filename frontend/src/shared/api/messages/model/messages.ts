import axios from "axios";
import { config } from "config";
import { Message } from "../../../../../../types";
import { GetMessagesQueryParams } from "./query";

export const getMessages = async ({ chatId }: GetMessagesQueryParams) => {
  const url = `${config.baseUrl}/api/messages?chatId=${chatId}`;

  return await axios.get<Message[]>(url).then(({ data }) => data);
};
