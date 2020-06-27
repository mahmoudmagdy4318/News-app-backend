const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
const redisClient = require("../../../Redis");
const util = require("util");
const _ = require("lodash");

const get = util.promisify(redisClient.get).bind(redisClient);
const set = util.promisify(redisClient.set).bind(redisClient);
const expire = util.promisify(redisClient.expire).bind(redisClient);

module.exports = function sourcesController() {
  //function to list all news sources paginated and filtered if needed
  const list = async (req, res, next) => {
    const { country, language, category, page } = req.query;
    const redisSources = await get("sources");
    const filter = {
      ...(country && { country }),
      ...(language && { language }),
      ...(category && { category }),
    };
    if (redisSources) {
      const sources = _.filter(JSON.parse(redisSources), filter);
      res.json({
        sources: page ? sources.slice(page * 9 - 9, page * 9) : sources,
        lastpage: Math.ceil(sources.length / 9),
      });
    } else {
      const { sources } = await newsapi.v2.sources(filter);
      await set("sources", JSON.stringify(sources));
      await expire("sources", 86400);
      res.json({
        sources: page ? sources.slice(page * 9 - 9, page * 9) : sources,
        lastpage: Math.ceil(sources.length / 9),
      });
    }
  };
  return { list };
};
