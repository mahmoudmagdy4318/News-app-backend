const _ = require("lodash");
const UserModel = require("../models");
const { getTopHeadlines, getUserSubscribedNews } = require("./helpers");

module.exports = function userController() {
  //get all user subscribed sources
  const getUserSources = async (req, res) => {
    const { id } = req.params;
    const { sources } = await UserModel.findOne({ _id: id }, "sources");
    res.json({ sources });
  };

  //handle subscription and unsubscription
  const updateUserSources = async (req, res) => {
    const { id, sid } = req.params;
    const { action } = req.body;
    const updateQuery =
      action === "subscribe"
        ? { $push: { sources: sid } }
        : { $pull: { sources: sid } };
    await UserModel.findOneAndUpdate({ _id: id }, updateQuery);
    res.json({ message: "updated successfully" });
  };

  //get news of user's subscribed sources
  const getUserNews = async (req, res) => {
    const { id } = req.params;
    const { q, language, page } = req.query;
    const { sources: userSources } = await UserModel.findOne(
      { _id: id },
      "sources"
    );
    //get the top Headlines if user hasn't subscribed to any sources yet
    if (userSources.length === 0) {
      const news = await getTopHeadlines();
      return res.json({ news });
    }
    //get the news of user's subscribed sources
    const news = await getUserSubscribedNews(q, language, page, userSources);
    res.json({ news });
  };
  return { getUserSources, updateUserSources, getUserNews };
};
