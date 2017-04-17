var express = require('express');
var router = express.Router();

const ensureAuthenticated = require('../lib/auth').ensureAuthenticated;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Stock App' });
});

/* GET home page. */
router.get('/moneymanage', function(req, res, next) {
  res.render('moneymanage', { title: 'Money Manager' });
});

module.exports = router;
