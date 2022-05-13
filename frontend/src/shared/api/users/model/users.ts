import axios from "axios";
import { config } from "config";
import { User } from "../../../../../../types";

export const getUser = async (userId: string): Promise<User> => {
  const url = `${config.baseUrl}/api/users?userId=${userId}`;

  return axios.get(url).then((res) => res.data);
};
