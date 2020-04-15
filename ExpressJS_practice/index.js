require('dotenv').config();

const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var userRouter = require("./routes/user.route");
var productsRouter = require('./routes/products.route');
var authRouter = require("./routes/auth.route");
var authMiddleware = require("./middleware/auth.middleware");
var cookieParser = require("cookie-parser"); 


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static('public'));

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", function (req, res) {
  res.render("index", {
    name: "Nam",
  });
});

app.use("/products", productsRouter);
app.use("/user", authMiddleware.requireAuth, userRouter);
app.use("/auth", authRouter);

app.listen(3456, function () {
  console.log("Server running... ");
});
