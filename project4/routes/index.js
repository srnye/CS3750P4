var express = require('express');
var router = express.Router();

const passport = require('../lib/auth').passport;
const ensureAuthenticated = require('../lib/auth').ensureAuthenticated;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Stock App' });
});

router.get('/moneyManagement', ensureAuthenticated, function(req, res, next) {
  res.render('moneyManagement', { title: 'Money Manager', user: req.user });
});

router.get('/addStock', ensureAuthenticated, function(req, res, next) {
  res.render('addStock', { title: 'Add Stock', user: req.user });
});

router.post('/addStock', (req, res, next) => 
{
  const stock = req.body.stockInput;

  //add tempItem to db
  var stockItem = {symbol: stock.Symbol, name: stock.Name, percentage: 0};
  User.addStock(req.user.id, stockItem, (err, stock) => {if(err){alert("error saving to db");}});

  console.log("hit");
  res.redirect('/addStock');
});

router.get('/myStocks', ensureAuthenticated, function(req, res, next) {
  res.render('myStocks', { title: 'My Stocks', user: req.user });
});

router.get('/stockView', ensureAuthenticated, function(req, res, next){
  res.render('stockView', {title: 'Stock View', user: req.user });
});

module.exports = router;