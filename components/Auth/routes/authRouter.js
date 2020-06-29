const express = require("express");
const { login, register } = require("../controllers")();
const { vaildateSignup } = require("../../Users/validations");
const checkIfLoggedIn = require("../../../middlewares/alreadyLoggedInMiddleware");

const authRouter = express.Router();

authRouter.post("/signup", checkIfLoggedIn, vaildateSignup, register);

authRouter.post("/login", checkIfLoggedIn, login);

module.exports = authRouter;
