import axios from "axios";

import { config } from "config";

import { queryParamsToString } from "shared/helpers/queryParamsToString";

import { Chat } from "../../../../../../types";

import { GetChatQueryParams, GetChatsQueryParams } from "./query";

export const getChats = async (
  queryParams: GetChatsQueryParams
): Promise<Chat[]> => {
  const url = `${config.baseUrl}/api/rooms${queryParamsToString(queryParams)}`;

  return await axios.get(url).then(({ data }) => data);
};

export const getChat = async (
  queryParams: GetChatQueryParams
): Promise<Chat> => {
  const url = `${config.baseUrl}/api/rooms${queryParamsToString(queryParams)}`;

  return await axios.get(url).then(({ data }) => data);
};
