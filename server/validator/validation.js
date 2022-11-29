//jshint esversion:6

const {
  check,
  sanitizedBody,
} = require("express-validator");

const registerValidation = [
  //Full Name validation
  check("name").trim().notEmpty().withMessage("Full Name is required!"),
  //Email || email validation
  check("email").notEmpty().withMessage("Email Address is required!").normalizeEmail().isEmail().withMessage("Email address must be valid"),
  //Password validation
  check("password").trim().notEmpty().withMessage("Password is required!").isLength({
    min: 5
  }).withMessage("Password must be minimum 5 characters long"),
];

const loginValidation = [
  //Email || email validation
  check("email").trim().notEmpty().withMessage("Email Address is required!").normalizeEmail().isEmail().withMessage("Email address must be valid"),
  //Password validation
  check("password").trim().notEmpty().withMessage("Password is required!").isLength({
    min: 5
  }).withMessage("Password must be minimum 5 characters long"),
];

module.exports = {registerValidation, loginValidation};
