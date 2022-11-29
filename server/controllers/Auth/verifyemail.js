const express = require('express');
const router = express.Router();
const User = require('../../models/User')


router.get("/verifyemail", function(req, res) {
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
  