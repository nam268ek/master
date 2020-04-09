const db = require("../db");
const shortid = require("shortid");
var dbUser = db.get("users").value();

module.exports.index = function (req, res) {
  res.render("./user/user", {
    users: dbUser,
  });
};

module.exports.search = function (req, res) {
  query = req.query.value;
  newArrUsers = dbUser.filter(function (user) {
    return user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  });

  res.render("user/user", {
    users: newArrUsers,
    query,
  });
};

module.exports.create = function (req, res) {
  res.render("user/create");
};

module.exports.userId = function (req, res, next) {
  var id = req.params.id;
  var user = db.get("users").find({ id: id }).value();
  next();
  res.render("user/view", {
    users: user,
  });
};

module.exports.postCreate = function (req, res) {
  req.body.id = shortid.generate();
  db.get("users").push(req.body).write();
  res.redirect("/user");
};
