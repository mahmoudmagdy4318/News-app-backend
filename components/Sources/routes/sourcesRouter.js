const express = require("express");
const { list } = require("../controllers");
const { authorizeUser } = require("../../../middlewares");

const sourcesRouter = express.Router();

sourcesRouter.get("/", authorizeUser, list);

module.exports = sourcesRouter;
