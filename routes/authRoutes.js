//? MAP CONTROLLER FUNCTIONS TO SPECIFIC REQUEST TYPES

const express = require("express");
const router = express.Router();

//* Custom import
const authenticateUser = require("../middleware/authenticateUser");

//* Auth controller functions
const {
  register,
  login,
  updateUser,
  deleteUser,
} = require("../controllers/authController");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/:id").delete(deleteUser);

module.exports = router;
