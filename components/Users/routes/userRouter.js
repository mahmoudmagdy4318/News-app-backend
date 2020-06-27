const express = require("express");
const { authorizeUser, authorizeUserActions } = require("../../../middlewares");
const { getUserSources, updateUserSources } = require("../controllers");

const userRouter = express.Router();

// userRouter.use(authorizeUser, authorizeUserActions);

userRouter.get("/:id/news");

userRouter.get(
  "/:id/sources",
  authorizeUser,
  authorizeUserActions,
  getUserSources
);

userRouter.patch(
  "/:id/sources/:sid",
  authorizeUser,
  authorizeUserActions,
  updateUserSources
);
module.exports = userRouter;
