const express = require("express");
const { authorizeUser, authorizeUserActions } = require("../../../middlewares");
const {
  getUserSources,
  updateUserSources,
  getUserNews,
} = require("../controllers");

const userRouter = express.Router();

userRouter.use(authorizeUser);

userRouter.get("/:id/news", authorizeUserActions, getUserNews);

userRouter.get("/:id/sources", authorizeUserActions, getUserSources);

userRouter.patch("/:id/sources/:sid", authorizeUserActions, updateUserSources);
module.exports = userRouter;
