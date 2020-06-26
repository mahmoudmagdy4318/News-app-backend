class CustomError extends Error {
  constructor(code, status, message) {
    super();
    this.message = message;
    this.code = code;
    this.status = status;
  }
}

module.exports = CustomError;
