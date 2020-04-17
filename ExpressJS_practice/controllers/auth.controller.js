
var userModel = require('../models/user.model');
var md5 = require("md5");

module.exports.login = function (req, res) {
  res.render("auth/login");
};

module.exports.postLogin = function (req, res) {
  var email = req.body.email;
  var pass = req.body.password;
  var hashedPassword = md5(pass); 
  var userLogin = userModel.find({ email: email });

  if (!userLogin) {
    res.render("auth/login", {
      errors: ["User does not exits."],
      email,
    });
    return;
  }


  if (userLogin.password !== hashedPassword) {
    res.render("auth/login", {
      errors: ["Wrong password."],
      email,
    });
    return;
  }

  res.cookie("userId", userLogin.id, {
    signed: true,
  });

  res.redirect("/user");
};
