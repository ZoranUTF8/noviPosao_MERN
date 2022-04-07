const statusCode = require("http-status-codes");
//? Create custom api error that we can create our custom errors

class CustomAPIError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.BAD_REQUEST;
    this.type = "Custom error";
  }
}

module.exports = CustomAPIError;
