const CustomError = require("../error-handling/CustomError");
const throwError = () => {
  throw new CustomError(
    "AUTHORIZATION_ERROR",
    401,
    "you are not authorized please login to complete this action"
  );
};
const authorizeUserActions = async function (req, res, next) {
  const { id } = req.params;
  const { id: currentUserId } = req.currentUser;
  if (id !== currentUserId) throwError();
  next();
};
module.exports = authorizeUserActions;
