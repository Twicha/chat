import { config } from "config";
import io from "socket.io-client";

const socket = io(config.baseUrl, {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
});

console.log(socket);

export default socket;
