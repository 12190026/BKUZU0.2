const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const ValidateEmail = require('../../utils/ValidateEmail')
const {JWT_SECRET,JWT_EXP} = require("../../config")
const express = require('express');
const router = express.Router();


const crypto = require("crypto");

const nodemailer = require('nodemailer');

const {check,
  sanitizedBody,
    matchedData,
    validationResult
  } = require("express-validator");

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
          res.render("login", {
            successMessage: "Your Email has been successfully verified, Please login to continue..."
          });
        }
      });
    } else {
      res.render("signup", {
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



  

  module.exports = async (req, res) => {
    const { name, email, password } = req.body
    let error = {}
    if (!name || name.trim().length === 0) {
      error.name = 'name field must be required'
    }
    if (!ValidateEmail(email)) {
      error.email = 'email address should be valid '
    }
    if (!email || email.trim().length === 0) {
      error.email = 'email field must be required'
    }
    if (!password || password.trim().length === 0) {
      error.password = 'password must be required'
    }
  
    if (Object.keys(error).length) {
      return res.status(422).json({ error })
    }
  
    try {
      const user = await User.findOne({ email })
      if (user) res.status(400).json({ error: 'email already exists' })
  
      const hashPassword = await bcrypt.hash(password, 8)
  
      const registerUser = new User({
        name,
        email,
        password: hashPassword,
        emailToken: crypto.randomBytes(64).toString("hex"),
        isVerified: false,
      })
  
      const saveUser = await registerUser.save()

      const token = jwt.sign({ userId: saveUser.id }, JWT_SECRET, {
        expiresIn: JWT_EXP,
      })
  
      saveUser.active = true
      await saveUser.save()
      

      link = "http://" + req.headers.host + "/verify-email?token=" + registerUser.emailToken;
      var mailOptions = {
        from: "B-KUZU",
        to: registerUser.email,
        subject: "B-KUZU - Verify Your Email",
        html: "<h2>Hello " + req.body.name + ", Thanks for registering on our Website</h2><h4> Please verify your email to continue...</h4><a href=" + link + ">Verify your Email</a>"
      };
      //sending mail
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log("email" + error);
        } else {
          console.log("Verification link is sent to your gmail account");
          res.redirect('/login', {
            successMessage: "Verification link is sent to your gmail account"
          });
        }
      });

      res.status(201).json({
        message: `Link send to ${email}`,
        data: {
          token,
  
        },
      })
  
  
  
    
    } catch (err) {
      console.log(err)
      return res.status(500).json({error:"Something went wrong"})
    }
  }
  