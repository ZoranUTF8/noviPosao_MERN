//* custom error
const UnauthenticatedError = require("../errors/unauthenticated");
// * json web token
const jwt = require("jsonwebtoken");
const authenticateUser = async (req, res, next) => {
  //* if no authorisation token present than throw unathrosied error error

  const authHeader = req.headers.authorization;

  //  * check if authorisation header is present and does it start with Bearer
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError(
      "Nedostaje authorization header za zahtjev."
    );
  }
  //  * if auth header is present than get the token from it
  const token = authHeader.split(" ")[1];

  try {
    //* Verify that the token matches the jwt secret
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // * add the userId to the request user
    req.user = { userId: payload.userId };
    //* proceed to next middleware
    next();
  } catch (error) {
    throw new UnauthenticatedError(error);
  }
};

module.exports = authenticateUser;
