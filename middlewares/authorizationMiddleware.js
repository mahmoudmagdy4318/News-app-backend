const CustomError = require("../error-handling/CustomError");
const UserModel = require("../components/Users/models");
const throwError = () => {
  throw new CustomError(
    "AUTHORIZATION_ERROR",
    401,
    "you are not authorized please login to complete this action"
  );
};
const authorizeToken = async function (req, res, next) {
  if (!req.headers.authorization) throwError();
  else {
    const token = req.headers.authorization;
    const currentUser = await UserModel.getCurrentUserFromToken(token);
    if (!currentUser) throwError();
    req.token = token;
    req.currentUser = currentUser;
    next();
  }
};
module.exports = authorizeToken;
