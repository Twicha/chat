import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  login,
} from "../controller/user.controller";

const Router = require("express");

const router = new Router();

router.post("/users", createUser);

router.get("/users", getUsers);

router.post("/login", login);

router.get("/users/:id", getUser);

router.delete("/users/:id", deleteUser);

module.exports = router;
