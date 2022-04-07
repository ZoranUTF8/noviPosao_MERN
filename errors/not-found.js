const CustomAPIError = require("../errors/custom-api");
const statusCode = require("http-status-codes");


class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.NOT_FOUND;
    this.type = "Custom BadRequest error";
  }
}

module.exports = NotFoundError;
