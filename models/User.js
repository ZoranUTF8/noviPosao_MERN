const mongoose = require("mongoose");
const validator = require("validator");
//* PASSWORD HASH
var bcrypt = require("bcryptjs");
//* JWT TOKEN
const jwt = require("jsonwebtoken");

//-----------------------------------
const { Schema } = mongoose;
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  lastname: {
    type: String,
    minlength: 3,
    maxlength: 20,
    trim: true,
    default: "No lastname",
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valide email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
    select: false,
    // WHEN SELECT IS FALSE WHEN USING QUERY FIND ONE THE PASSWORD WONT BE RETURNED
  },
  location: {
    type: String,
    trim: true,
    maxlength: 30,
    default: "No location",
  },
});

//* Triggered whenever we add a new user to DB.(.create and .save in mongoose action)
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  //* CREATE SALT
  const salt = await bcrypt.genSalt(10);

  //* hash the password
  this.password = await bcrypt.hash(this.password, salt);
});

//? CUSTOM MODEL INSTANCE METHODS

//* Create a JWT for a user
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

//* Check a user password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
