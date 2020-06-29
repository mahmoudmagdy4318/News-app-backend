const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
const { get, set, expire } = require("../../../Redis");
const { prepareResponse } = require("./helpers");
module.exports = function sourcesController() {
  //function to get all news sources paginated and filtered if needed
  const list = async (req, res, next) => {
    const { country, language, category, page } = req.query;

    //filtration object to get the sources filtered as needed
    const filter = {
      ...(country && { country }),
      ...(language && { language }),
      ...(category && { category }),
    };

    //get the sources from the cache
    const redisSources = await get("sources");

    if (redisSources) {
      return res.json(prepareResponse(JSON.parse(redisSources), page, filter));
    }
    //get the sources from the api if they are not cached yet or expired and cache them
    const { sources } = await newsapi.v2.sources();
    await set("sources", JSON.stringify(sources));
    await expire("sources", 86400);
    res.json(prepareResponse(sources, page, filter));
  };
  return { list };
};
