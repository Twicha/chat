import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
} from "../controller/room.controller";

const Router = require("express");

const router = new Router();

router.post("/rooms", createRoom);

router.get("/rooms", getRooms);

router.get("/rooms/:id", getRoom);

router.delete("/rooms/:id", deleteRoom);

module.exports = router;
