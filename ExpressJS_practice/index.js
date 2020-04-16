require("dotenv").config();

const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var userRouter = require("./routes/user.route");
var productsRouter = require("./routes/products.route");
var authRouter = require("./routes/auth.route");
var authMiddleware = require("./middleware/auth.middleware");
var sessionMiddleware = require("./middleware/session.middleware");
var cookieParser = require("cookie-parser");
var cartRouter = require("./routes/cart.route");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware.sessionId);
app.use(express.static("public"));

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", function (req, res) {
  res.render("index", {
    name: "Nam",
  });
});

app.use("/cart", cartRouter);
app.use("/products", authMiddleware.requireAuth, productsRouter);
app.use("/user", authMiddleware.requireAuth, userRouter);
app.use("/auth", authRouter);

app.listen(3456, function () {
  console.log("Server running... ");
});
