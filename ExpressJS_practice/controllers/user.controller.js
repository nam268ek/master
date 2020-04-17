var dbUser = require("../models/user.model");
var md5 = require("md5");

module.exports.index = async function (req, res) {
  var user = await dbUser.find();

  res.render("./user/user", {
    users: user,
  });
};

module.exports.search = async function (req, res) {
  query = req.query.value;
  newArrUsers = await dbUser.find({name: query});
  // newArrUsers.filter(function (user) {
  //   return user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  // });
  // newArrUsers = await dbUser.find();
  res.render("user/user", {
    users: newArrUsers,
    query,
  });
};

module.exports.create = function (req, res) {
  res.render("user/create");
};

module.exports.userId = async function (req, res, next) {
  var id = req.params.id;
  var user = await dbUser.findById(id);
  res.render("user/view", {
    users: user,
  });
};

module.exports.postCreate = async function (req, res) {
  var pass = req.body.password;
  var passMd5 = md5(pass);

  var error = [];
  var newUser = {
    name: req.body.name,
    email: req.body.email,
    password: passMd5,
    file: req.file.path.split("\\").slice(1).join("/"),
  };

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
  // Add newUser to the database with collection users
  dbUser.insertMany(newUser);

  res.redirect("/user");
};
