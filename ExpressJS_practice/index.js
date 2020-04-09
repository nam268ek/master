const express = require("express");
const app = express();
var bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({users: []}).write()
var dbUser = db.get("users").value();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", function (req, res) {
  res.render("index", {
    name: "Nam",
  });
});

app.get("/user", function (req, res) {
  res.render("./user/user", {
    users: dbUser
  });
});

app.get("/user/search", function (req, res) {
  var query = req.query.value;
  var newArrUsers = dbUser.filter(function (user) {
    return user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  });

  res.render("user/user",{
      users: newArrUsers, query
    });
});

app.get("/user/create",function (req, res) {
  res.render('user/create');
});

app.get('/user/:id', function(req, res) {
  var id = req.params.id;
  var user = db.get('users').find({ id: id }).value();

  res.render('user/view', {
    users: user 
  });
});

app.post("/user/create", function (req, res) {
  req.body.id = shortid.generate();
  db.get("users").push(req.body).write();
  res.redirect("/user");
});

app.listen(3456, function () {
  console.log("Server running... ");
});
