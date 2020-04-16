var db = require("../db");

module.exports.addToCart = function (req, res, next) {
  var productId = req.params.productId;
  var sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect("/products");
    return;
  }
  var count = db
    .get("session")
    .find({ sessionId: sessionId })
    .get("cart." + productId, 0)
    .value();

  db.get("session")
    .find({ sessionId: sessionId })
    .set("cart." + productId, count + 1)
    .write();
  res.redirect("/products");
  next();
};
