const _ = require("lodash");

const prepareResponse = (srcs, page, filter) => {
  const sources = _.filter(srcs, filter);
  return {
    sources: page ? sources.slice(page * 9 - 9, page * 9) : sources,
    lastpage: Math.ceil(sources.length / 9),
  };
};

module.exports = { prepareResponse };
