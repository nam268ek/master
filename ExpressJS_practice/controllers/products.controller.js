
var productsDb = require('../models/products.model');

module.exports.products = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const totalProduct = await productsDb.countDocuments();
  const pageLimit = Math.floor(totalProduct/limit);
  var start = (page - 1) * limit;
  var end = page * limit;
  const results = {};
  var product = await productsDb.find().limit(limit).skip(start).exec();
  
  if (end < await productsDb.countDocuments()) {
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
    results: product,
    nextPage: results.nextPage.page,
    current: page,
    previous: results.previous.page,
    pageLimit: pageLimit,
  });
};
