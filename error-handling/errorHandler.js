const errorHandler = (err) => {
  if (err.code) {
    return err;
  } else {
    err.status = 400;
    err.message = "an error occured";
  }
};

module.exports = errorHandler;
