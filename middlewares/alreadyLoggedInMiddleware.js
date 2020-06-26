const CustomeError = require("../error-handling/CustomError");
const errorCodes = require("../error-handling/errorCodes");
const checkIfLoggedIn = function (req, res, next) {
  if (req.headers.authorization)
    throw new CustomeError(
      errorCodes.loggined,
      409,
      "You are already loginned"
    );
  next();
};

module.exports = checkIfLoggedIn;
