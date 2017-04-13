var express = require('express');
var router = express.Router();

const ensureAuthenticated = require('../lib/auth').ensureAuthenticated;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('stockTrends', { title: 'Stock Trends' });
});

module.exports = router;
