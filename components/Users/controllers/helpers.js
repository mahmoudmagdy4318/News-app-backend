const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

//get top Headlines news
const getTopHeadlines = () => {
  return newsapi.v2.topHeadlines({
    language: "en",
  });
};

//get sources news
const getUserSubscribedNews = (q, language, page, userSources) => {
  return newsapi.v2.everything({
    q,
    sources: userSources.join(","),
    language,
    sortBy: "publishedAt",
    page: page || 1,
  });
};

module.exports = { getTopHeadlines, getUserSubscribedNews };
