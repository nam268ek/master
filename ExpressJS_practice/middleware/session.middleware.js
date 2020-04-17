const shortid = require("shortid");
var session = require('../models/session.model');
module.exports.sessionId = function (req, res, next) {
  var sessionId = shortid.generate();

  if (!req.signedCookies.sessionId) {
    res.cookie("sessionId", sessionId, {
      signed: true,
    });
    // db.get("session")
    //   .push({ sessionId: sessionId })
    //   .write();
      session.insertMany(sessionId);
  }

  next();
};
