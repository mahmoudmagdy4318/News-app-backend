const UserModel = require("../../Users/models");
const CustomError = require("../../../error-handling/CustomError");
const errorCodes = require("../../../error-handling/errorCodes");
module.exports = function authController() {
  //helper function to get specific user
  const getUser = (email) => {
    return UserModel.findOne({ email });
  };
  //registration function
  const register = async (req, res, next) => {
    const user = new UserModel(req.body);
    try {
      const newUser = await user.save();
      const token = await newUser.generateToken();
      res.json({ token });
    } catch (err) {
      if (err.code === 11000)
        throw new CustomError(
          errorCodes.Registration,
          403,
          "User already exists"
        );
      next(err);
    }
  };
  //login function
  const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await getUser(email);
    if (user) {
      const passCmp = await user.comparePassword(password);
      if (!passCmp)
        throw new CustomError(
          errorCodes.Authentication,
          401,
          "invalid email or password"
        );
      const token = await user.generateToken();
      res.json({ token });
    } else {
      throw new CustomError(
        errorCodes.Authentication,
        401,
        "invalid email or password"
      );
    }
  };

  return {
    register,
    login,
  };
};
