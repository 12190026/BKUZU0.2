const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const nodemailer = require('nodemailer');


module.exports = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        var errMsg = errors.mapped();
        var inputData = matchedData(req);
        res.render("register", {
          errors: errMsg,
          inputData: inputData
        });
      } else {
        User.findOne({
          email: req.body.email
        }, function(err, foundUser) {
          if (err) {
            res.render("register", {
              errorMessage: err
            });
          } else if (foundUser) {
            res.render("register", {
              errorMessage: "This email is already used by another person. Please try with different email."
            });
          } else {
            bcrypt.hash(req.body.password, 10, function(err, hash) {
              const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                emailToken: crypto.randomBytes(64).toString("hex"),
                isVerified: false,
              });
              user.save(function(err) {
                if (err) {
                  console.log(err);
                } else {
                  link = "http://" + req.headers.host + "/verifyemail?token=" + user.emailToken;
                  var mailOptions = {
                    from: "B-KUZU",
                    to: user.email,
                    subject: "B-KUZU - Verify Your Email",
                    html: "<h2>Hello " + req.body.name + ", Thanks for registering on our Website</h2><h4> Please verify your email to continue...</h4><a href=" + link + ">Verify your Email</a>"
                  };
  
                  //sending mail
                  transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                      console.log("email" + error);
                    } else {
                      console.log("Verification link is sent to your gmail account");
                      res.render("login", {
                        successMessage: "Verification link is sent to your gmail account"
                      });
                    }
                  });
                }
              });
            });
          }
        });
      }
    } catch (err) {
      console.log(err)
      return res.status(500).json({error:"Something went wrong"})
    }
  };
  