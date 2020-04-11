const db = require("../db");
var md5 = require("md5");

module.exports.login = function (req, res) {
  res.render("auth/login");
};

module.exports.postLogin = function (req, res) {
  var email = req.body.email;
  var pass = req.body.password;
  var userLogin = db.get("users").find({ email: email }).value();

  if (!userLogin) {
    res.render("auth/login", {
      errors: ["User does not exits."],
      email,
    });
    return;
  }
  var hashedPassword = md5(pass);

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
