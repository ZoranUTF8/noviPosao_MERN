const UnauthenticatedError = require("../errors/unauthenticated");

const checkPermissions = (requestUser, resourceUserId) => {
  //* add admin role later
  if (requestUser.userId === resourceUserId.toString()) {
    //* User id and resource id are the same
    console.log('====================================');
    console.log("USER ID AND RESOURCE ID ARE THE SAME");
    console.log('====================================');
    return;
  } else {
    console.log("====================================");
    console.log("USER ID AND RESOURCE ID ARE NOT THE SAME");
    console.log("====================================");
    throw new UnauthenticatedError("Niste ovlašteni za pristup ovoj ruti.");
  }
};

module.exports = checkPermissions;
