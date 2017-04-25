var express = require('express');
var router = express.Router();
var yahooFinance = require('yahoo-finance');
var markit = require('node-markitondemand');

const passport = require('../lib/auth').passport;
const ensureAuthenticated = require('../lib/auth').ensureAuthenticated;
let User = require('../models/user');

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
  const stock = JSON.parse(req.body.stockInput);

  //add tempItem to db
  var stockItem = {symbol: stock.value, name: stock.label, percentage: 0};
  User.addStock(req.user.id, stockItem, (err, stock) => {if(err){alert("error saving to db");}});

  res.redirect('/addStock');
});

router.get('/myStocks', ensureAuthenticated, function(req, res, next) {
  var s = [];

  if (req.user.stocks.length > 0)
  {
    for(var stock in req.user.stocks)
    {
      if (isNaN(parseInt(stock)))
      {    
      }
      else
      {
        s.push(req.user.stocks[stock].symbol);
      }
    }

    yahooFinance.snapshot({
      symbols: s,
      fields: ['o', 'c1', 's', 'n'],
      }, function (err, snapshot) {
        //... 
        if (err)
        {

        }
        else
        {
          //stockArr.push(snapshot);
          //console.log(snapshot);
          res.render('myStocks', { title: 'My Stocks', user: req.user, stocks: snapshot  });
        }
      });
  }
  else
  {
     res.render('myStocks', { title: 'My Stocks', user: req.user, stocks: s  });
  }
  
  
  //res.render('myStocks', { title: 'My Stocks', user: req.user, stocks: JSON.stringify(s)  });
});

router.get('/stockView', ensureAuthenticated, function(req, res, next)
{
    var s = [];

  if (req.user.stocks.length > 0)
  {
    for(var stock in req.user.stocks)
    {
      if (isNaN(parseInt(stock)))
      {    
      }
      else
      {
        s.push(req.user.stocks[stock].symbol);
      }
    }
      yahooFinance.snapshot({
      symbols: s,
      fields: ['o', 'c1', 's', 'n'],
      }, function (err, snapshot) {
        //... 
        if (err)
        {

        }
        else
        {
            res.render('stockView', {title: 'Stock View', user: req.user, stock: s  });
        }
      }
  )
}
});

router.get('/remove/:sym/:id', (req, res, next) => {
  const sym = req.params.sym;
  
  
  // Question.updateQuestion(query, update, {}, (err, question) => {
  //   if(err){
  //     res.send(error);
  //   }
  //   res.redirect('/manage/questions');
  // });

  User.removeStock(req.user.id, sym, (err, stock) => 
  {
    if(err)
    {
      console.log("error saving to db");
    }
  });
  res.redirect('/myStocks');
});

module.exports = router;