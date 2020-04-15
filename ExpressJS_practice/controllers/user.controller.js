const db = require("../db");
const shortid = require("shortid");
var dbUser = db.get("users").value();
var md5 = require("md5");


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
  var pass = req.body.password;
  var passMd5 = md5(pass);

  var error = [];
  var newUser = [
    {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      password: passMd5,
      file: req.file.path.split('\\').slice(1).join('/'),
    }
  ];

  if (!req.body.name) {
    error.push("Error input name");
  }
  if (!req.body.email) {
    error.push("Error input email");
  }
  if (error.length) {
    res.render("user/create", {
      errors: error,
      name,
      email,
    });
    return;
  }

  db.get("users").push(newUser[0]).write();
  res.redirect("/user");
};
