const UserModel = require("../models");
module.exports = function userController() {
  //get all user subscribed sources
  const getUserSources = async (req, res, next) => {
    const { id } = req.params;
    const { sources } = await UserModel.findOne({ _id: id }, "sources");
    res.json({ sources });
  };

  //handle subscription and unsubscription
  const updateUserSources = async (req, res, next) => {
    const { id, sid } = req.params;
    const { action } = req.body;
    const updateQuery =
      action === "subscribe"
        ? { $push: { sources: sid } }
        : { $pull: { sources: sid } };
    await UserModel.findOneAndUpdate({ _id: id }, updateQuery);
    res.json({ message: "updated successfully" });
  };
  return { getUserSources, updateUserSources };
};
