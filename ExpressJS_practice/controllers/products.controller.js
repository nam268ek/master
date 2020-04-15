const db = require("../db");
var productsDb = db.get("products").value();

module.exports.products = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const pageLimit = Math.floor(productsDb.length/limit);
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

  if (page === 1) {
    results.previous = {
      page: 1,
      limit: limit
    }
  }

  res.locals.results = results;

  next();

  res.render('products/products', {
    results: productsDb.slice(start, end),
    nextPage: results.nextPage.page,
    current: page,
    previous: results.previous.page,
    pageLimit: pageLimit,
  });
};
