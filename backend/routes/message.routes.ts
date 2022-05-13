import { getMessages } from "../controller/message.controller";

const Router = require("express");

const router = new Router();

router.get("/messages", getMessages);

module.exports = router;
