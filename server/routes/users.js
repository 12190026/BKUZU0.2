//jshint esversion:6

const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require("../models/User");
const cookieParser = require("cookie-parser");
const app = express();

const {
  loginrequired,
  verifyEmail
} = require("../config/JWT");

const {
  registerValidation,
  loginValidation
} = require("../validator/validation");

const {check,
sanitizedBody,
  matchedData,
  validationResult
} = require("express-validator");

app.use(cookieParser());
app.use(express.json());


router.get("/login", function(req, res) {
  res.render("/");
});

router.get("/register", function(req, res) {
  res.render("register");
});

router.get("/homepage", loginrequired, function(req, res) {
  res.render("homepage");
});

router.get("/resetPasswordForm", function(req, res){
  res.render("resetPasswordForm");
});

router.get("/forgotPassword", function(req, res){
  res.render("forgotPassword");
});

router.get("/profile",loginrequired, function(req,res){
  res.render("profile")
})

// mail sender details
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.auth_user,
    pass: process.env.auth_pass
  },
  tls: {
    rejectUnauthorized: false
  }
});

router.get("/logout", function(req, res, next) {
  res.cookie("access_token", "", {
    maxAge: 1
  });
  res.redirect("/login");
});

const createToken = (id) => {
  return jwt.sign({
    id
  }, process.env.JWT_SECRET);
};

router.get("/verify-email", function(req, res) {
  try {
    const token = req.query.token;
    const user = User.findOne({
      emailToken: token
    });
    if (user) {
      user.updateOne({
        isVerified: true
      }, function(err) {
        if (err) {
          res.render("login", {
            errorMessage: err
          });
        } else {
          res.redirect("/");
        }
      });
    } else {
      res.render("register", {
        errorMessage: "Something went wrong, Please try with different gmail!"
      });
    }
  } catch (err) {
    console.log("Verification Failed here " + err);
    res.render("login", {
      errorMessage: err
    });
  }
});

module.exports = router;
