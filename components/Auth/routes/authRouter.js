const express = require("express");
const { login, register } = require("../controllers")();
const { vaildateSignup, vaildateUpdateUserData } = require("../validations");
const checkIfLoggedIn = require("../../../middlewares/alreadyLoggedInMiddleware");

authRouter = express.Router();

authRouter.post("/signup", checkIfLoggedIn, vaildateSignup, register);

authRouter.post("/login", checkIfLoggedIn, login);

module.exports = authRouter;
