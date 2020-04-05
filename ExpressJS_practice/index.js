const express = require("express");
const app = express();
const port = 3456;

app.set("view engine", "pug");
app.set("views", "./views");

var users = [
    { id: 1, name: "NAM" },
    { id: 2, name: "SON" },
  ];
//Bài 2 - Template engines
app.get("/", function (req, res) {
  res.render("index", {
    name: "Nam",
  });
});
app.get("/user", function (req, res) {
  res.render("./user/user", {
    users: users
  });
});

app.get('/user/search', function(req, res) {
    var query = req.query.value;
    var newArrUsers = users.filter(function(user) {
        return user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    
    res.render('user/user',{
        users: newArrUsers
    });
});

app.listen(3456, function () {
  console.log("Server listening on port" + port);
});
