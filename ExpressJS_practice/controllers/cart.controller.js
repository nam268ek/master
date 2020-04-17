
var session = require('../models/session.model');
module.exports.addToCart = async function (req, res, next) {
  var productId = req.params.productId;
  var sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect("/products");
    return;
  }
  var count = await session.find(sessionId);
    // .get("cart." + productId, 0)
    // ;

  // db.get("session")
  //   .find({ sessionId: sessionId })
  //   .set("cart." + productId, count + 1)
  //   .write();
  session.find({ sessionId: sessionId });
  res.redirect("/products");
  next();
};
