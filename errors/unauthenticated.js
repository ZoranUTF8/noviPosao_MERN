const statusCode = require("http-status-codes");
const CustomAPIError = require("../errors/custom-api");

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.UNAUTHORIZED;
    this.type = "Custom UnauthenticatedError error";
  }
}

module.exports = UnauthenticatedError;
