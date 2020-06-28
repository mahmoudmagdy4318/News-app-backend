const prepareResponse = (sources, page) => {
  return {
    sources: page ? sources.slice(page * 9 - 9, page * 9) : sources,
    lastpage: Math.ceil(sources.length / 9),
  };
};

module.exports = { prepareResponse };
