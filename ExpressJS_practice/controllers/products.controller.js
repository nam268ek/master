const db = require("../db");
var productsDb = db.get("products").value();

// module.exports.products = function (req, res) {
//   var page = parseInt(req.query.page) || 1;
//   var perPage = 4;
//   var start = (page - 1) * perPage;
//   var end = page * perPage;
//   res.render("products/products", {
//     products: productsDb.slice(start, end),
//   });
// };

module.exports.products = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 4;

  var start = (page - 1) * limit;
  var end = page * limit;
  const results = {};

  if (end < productsDb.length) {
    results.nextPage = {
      page: page + 1,
      limit: limit,
    };
  }
  
  if (start > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  res.locals.results = results;
  //console.log(results.nextPage.page, results.previous.page);
  next();

  res.render('products/products', {
    results: productsDb.slice(start, end),
    nextPage: results.nextPage.page,
    current: page,
    previous: results.previous.page
  });
};
