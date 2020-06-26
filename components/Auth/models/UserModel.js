const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const salt_rounds = Number(process.env.SALT_ROUNDS);
const jwt = require("jsonwebtoken");
const util = require("util");
const uniqueArrayPlugin = require("mongoose-unique-array");
const CustomError = require("../../../error-handling/CustomError");

const { Schema } = mongoose;

const UserModel = new Schema({
  fullname: {
    type: "String",
    required: [true, "fullname is required"],
  },
  email: {
    type: "String",
    required: [true, "email is required"],
    index: { unique: [true, "this email already taken!"] },
  },
  password: { type: "String", required: [true, "password is required"] },
  resourses: [{ type: "String" }],
});
//add uniqueness to schema arrays
UserModel.plugin(uniqueArrayPlugin);
//pre save hook to encrypt the user's password
UserModel.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, salt_rounds);
  }
});

//function to compare the password when the user try to login
UserModel.methods.comparePassword = function (pass) {
  return bcrypt.compare(pass, this.password);
};

//promisify jwt functions
const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);

//generate jwt
UserModel.methods.generateToken = function () {
  return sign(
    {
      _id: this._id,
      username: this.fullname,
      email: this.email,
    },
    process.env.SECRET_KEY,
    { expiresIn: "10h" }
  );
};

//verification of user's token
const verifyToken = async (token) => {
  try {
    const payload = await verify(token, process.env.SECRET_KEY);
    return payload;
  } catch (error) {
    throw new CustomError(
      "AUTHORIZATION_ERROR",
      401,
      "you are not authorized please login to complete this action"
    );
  }
};
//function to get current user loggedIn from his token
UserModel.statics.getCurrentUserFromToken = function (token) {
  const payload = verifyToken(token);
  return this.findOne({
    _id: payload._id,
  });

  //   if (!currentUser)
  //     throw new CustomError(true, "INVALID_USER", 403, "user not found");
  //   // currentuser = currentUser[0];
  //   return currentuser;
  // } catch (error) {
  //   throw new CustomError(
  //     true,
  //     "AUTHORIZATION_ERROR",
  //     401,
  //     "you are not authorized please login to complete this action"
  //   );
  // }
};

module.exports = mongoose.model("User", UserModel);
