const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const CustomError = require("../../../error-handling/CustomError");
const errorCodes = require("../../../error-handling/errorCodes");

const signupSchema = Joi.object({
  fullname: Joi.string().min(5).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),

  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .min(6)
    .required(),
});

const updateUserSchema = Joi.object({
  fullname: Joi.string().min(5),

  email: Joi.string().email({
    minDomainSegments: 2,
  }),

  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .min(6),
  resourses: Joi.array().items(Joi.string()).unique(),
  action: Joi.string(),
});

const vaildateSignup = (req, res, next) => {
  const validation = signupSchema.validate(req.body);
  if (validation.error) {
    throw new CustomError(errorCodes.Validation, 422, validation.error.message);
  }
  next();
};

const vaildateUpdateUserData = (req, res, next) => {
  const validation = updateUserSchema.validate(req.body);
  if (validation.error) {
    throw new CustomError(errorCodes.Validation, 422, validation.error.message);
  }
  next();
};

const UserValidations = {
  vaildateSignup,
  vaildateUpdateUserData,
};
module.exports = UserValidations;
