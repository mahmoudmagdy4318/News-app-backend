const authorizeToken = async function (req, res, next) {
  const { id } = req.params;
  const { currentUser } = req;
  if (id !== currentUser.id)
    throw new Error(
      "authorization failed, You are not authorized to complete this action!"
    );
  next();
};

module.exports = authorizeToken;
