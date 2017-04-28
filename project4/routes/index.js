var express = require('express');
var router = express.Router();
var yahooFinance = require('yahoo-finance');
var moment = require('moment');

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
  if(stockItem.name != 'undefined (undefined)')
  {
     User.addStock(req.user.id, stockItem, (err, stock) => {if(err){alert("error saving to db");}});
  }

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

// router.post('/stockView', function(req, res, next){

//   const time = JSON.parse(req.body.timeInput);

//   var s = req.user.stocks;
//   var t = [];

//   // get array of stock symbols
//   for(var stock in s)
//     {
//       if (isNaN(parseInt(stock)))
//       {    
//       }
//       else
//       {
//         t.push(req.user.stocks[stock].symbol);
//       }
//     }

//   // moment test
//   // format the current date
//   var stop = moment().format('YYYY-MM-DD');

//   //time math example
//    var start = moment(stop).subtract(1, 'month').format('YYYY-MM-DD');

//   //pull historic data from yahoo-finance
//   yahooFinance.historical({
//     symbols: t,
//     from: start,
//     to: stop,
//     period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only) 
//   }, function (err, quotes) {

//     if(err){
//       // do nothing
//     }else{
      
//       res.render('stockView', {title: 'Stock View', user: req.user, stocks: quotes, mystocks: s, tickers: t, startdate: start, finishdate: stop});
//     }

//   });

// });

router.get('/stockView', ensureAuthenticated, function(req, res, next){

  var s = req.user.stocks;
  var t = [];
  var test = "please see me";

  // get array of stock symbols
  for(var stock in s)
    {
      if (isNaN(parseInt(stock)))
      {    
      }
      else
      {
        t.push(req.user.stocks[stock].symbol);
      }
    }

    // does the user have stocks?
  if(req.user.stocks.length > 0){
    

      // moment test
    // format the current date
    var stop = moment().format('YYYY-MM-DD');

    //time math example
    var start = moment(stop).subtract(1, 'month').format('YYYY-MM-DD');

    //pull historic data from yahoo-finance
    yahooFinance.historical({
      symbols: t,
      from: start,
      to: stop,
      period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only) 
    }, function (err, quotes) {

      if(err){
        // do nothing
      }else{
        
        res.render('stockView', {title: 'Stock View', user: req.user, stocks: quotes, mystocks: s, tickers: t, startdate: start, finishdate: stop });
      }

    });


  }else{
    res.render('stockView', { title: 'Stock View', user: req.user});
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