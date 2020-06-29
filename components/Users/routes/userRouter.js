const express = require("express");
const { authorizeUser, authorizeUserActions } = require("../../../middlewares");
const { vaildateUpdateUserData } = require("../../Users/validations");
const {
  getUserSources,
  updateUserSources,
  getUserNews,
} = require("../controllers");

const userRouter = express.Router();

userRouter.use(authorizeUser);

userRouter.get("/:id/news", authorizeUserActions, getUserNews);

userRouter.get("/:id/sources", authorizeUserActions, getUserSources);

userRouter.patch(
  "/:id/sources/:sid",
  authorizeUserActions,
  vaildateUpdateUserData,
  updateUserSources
);
module.exports = userRouter;
