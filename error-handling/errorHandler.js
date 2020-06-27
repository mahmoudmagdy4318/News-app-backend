const errorHandler = (err) => {
  if (err.code) {
    return err;
  } else {
    err.status = 500;
    err.message = "an error occured";
  }
  return err;
};

module.exports = errorHandler;
