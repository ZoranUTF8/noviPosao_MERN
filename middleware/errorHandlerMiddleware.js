//* status codes
const { StatusCodes } = require("http-status-codes");
const statusCode = require("http-status-codes");
const colors = require("colors");

const errorHandlerMiddlware = (error, req, res, next) => {
  //* for dev purposes
  console.log("====================================");
  console.log(`ERROR IN ERROR MIDDLEWARE => ${error}`.red);
  console.log("====================================");

  // ? default error
  const defaultError = {
    statusCode: error.statusCode || statusCode.INTERNAL_SERVER_ERROR,
    //* use specific error message or default template
    msg: error.message || "Something went wrong. Error handler middleware.",
  };

  //* check error name
  if (error.name === "ValidationError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    // defaultError.msg = error.message;
    //? same as up, here we acces the object values
    defaultError.msg = Object.values(error.errors)
      .map((err) => err.message)
      .join(",");
  }

  if (error.code && error.code == 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;

    //? Send the key of error object so we can see which fi
    defaultError.msg = `Oops, looks like this ${Object.keys(
      error.keyValue
    )} is already registered,  your input was: ${Object.values(
      error.keyValue
    )}`;
  }

  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

module.exports = errorHandlerMiddlware;
