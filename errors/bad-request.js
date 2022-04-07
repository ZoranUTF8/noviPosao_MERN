const CustomAPIError = require("../errors/custom-api");
const statusCode = require("http-status-codes");


class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.BAD_REQUEST;
    this.type = "Custom BadRequest error";
  }
}

module.exports = BadRequestError;
