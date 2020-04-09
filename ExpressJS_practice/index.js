const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var userRouter = require('./routes/user.route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", function (req, res) {
  res.render("index", {
    name: "Nam",
  });
});

app.use('/user', userRouter);

app.listen(3456, function () {
  console.log("Server running... ");
});
