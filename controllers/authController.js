//? HANDLE  AUTH REQUSTS
const express = require("express");
//* User model
const UserModel = require("../models/User");
//* status codes
const statusCode = require("http-status-codes");
// * create custom error class

const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");

//? REGISTER USER
const register = async (req, res) => {
  //* get user values from the frontend
  const { name, email, password } = req.body;

  //* Check for values missing even it is checked by mongodb
  if (!name || !email || !password) {
    //*  (send to the error midleware)
    throw new BadRequestError("Please provide all values");
  }

  //* Check for  duplicate email before mongoose
  const emailCheck = await UserModel.findOne({ email });

  if (emailCheck) {
    console.log(emailCheck);
    //* send new Error as email is already in use
    throw new BadRequestError(
      `Oops, looks like this email is already registered,  your input was: ${emailCheck.email}`
    );
  }
  //* Send new user object to be created in db
  const user = await UserModel.create({
    name,
    password,
    email,
  });

  const token = user.createJWT();

  //* Send the user token and specific info back
  res.status(statusCode.CREATED).json({
    user: {
      email: user.email,
      lastname: user.lastname,
      location: user.location,
      name: user.name,
    },
    token,
    location: user.location,
  });
};
//? LOGIN USER
const login = async (req, res) => {
  //? get user values from frontend
  const { email, password } = req.body;
  //? check if required values are present
  if (!email || !password) {
    throw new BadRequestError("Molimo unesite sve vrijednosti");
  }

  //? check if user with email exists in db
  //? we need ot add +password as it will not be priovided in the user object as we have select false in the user model
  const user = await UserModel.findOne({ email }).select("+password");

  //? no user with specified email exists
  if (!user) {
    throw new UnauthenticatedError("Login podaci netačni ili nepotpuni");
  }

  //? compare user password
  const isPasswordCorrect = await user.comparePassword(password);

  //? if passwords dont match
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Login podaci netačni ili nepotpuni");
  }

  //? if all good
  const token = user.createJWT();

  //? dont return the password
  user.password = undefined;
  user.__v = undefined;

  res.status(statusCode.OK).json({ user, token, location: user.location });
};
//? UPDATE USER
const updateUser = async (req, res) => {
  //* Logic runs after the user is authenticated

  //* get the new values from the user request
  const { email, name, lastname, location } = req.body;

  //* If any values missing throw bad request error
  if (!email || !name || !lastname || !location) {
    throw new BadRequestError("Unesite sve vrijednosti.");
  }

  // * Query for the user from db using the id
  const user = await UserModel.findOne({ _id: req.user.userId });

  // * Set the user values to the new values
  user.email = email;
  user.name = name;
  user.lastname = lastname;
  user.location = location;

  // * Save the use back to the db
  await user.save();

  // * response sent back with a new token but it is optional
  const token = user.createJWT();

  res.status(statusCode.OK).json({
    user,
    token,
    location: user.location,
  });
};
//? DELETE USER
const deleteUser = async (req, res) => {
  const { id: userId } = req.params;

  //* If any values missing throw bad request error
  if (!userId) {
    throw new BadRequestError("Unesite sve vrijednosti.");
  }

  //* Check if user exists
  const user = await UserModel.findById({ _id: userId });

  // * If user is false throw not found
  if (!user) {
    throw new NotFoundError(`Nema korisnika sa ID-om ${userId}`);
  } else {
    // * Delete the user
    await user.remove();
    res.status(statusCode.OK).json({ msg: "Račun je uspješno obrisan." });
  }
};

module.exports = { register, login, updateUser, deleteUser };
