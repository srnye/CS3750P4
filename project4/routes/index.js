var express = require('express');
var router = express.Router();
var yahooFinance = require('yahoo-finance');
var PathLoader = require('path-loader');

const passport = require('../lib/auth').passport;
const ensureAuthenticated = require('../lib/auth').ensureAuthenticated;
let User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Stock App' });
});

router.get('/moneyManagement', ensureAuthenticated, function(req, res, next) {
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
        s.push(req.user.stocks[stock]);
      }
    }
  }

  res.render('moneyManagement', { title: 'Money Management', user: req.user, stocks: s  });
  
});

router.post('/moneyManagement', (req, res, next) => 
{
  const newStocks = JSON.parse(req.body.newStocks);

  User.updateStocks(req.user.id, newStocks, (err, stocks) => 
  {
    if(err)
    {
      alert("error saving to db");
    }
    else
    {      
    }
  });
  res.redirect('/moneyManagement');

  //User.addStock(req.user.id, stockItem, (err, stock) => {if(err){alert("error saving to db");}});  
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

router.post('/stocksView', (req, res, next) => 
{
  var s1 = [];

  if (req.user.stocks.length > 0)
  {
    for(var stock in req.user.stocks)
    {
      if (isNaN(parseInt(stock)))
      {    
      }
      else
      {
        s1.push(req.user.stocks[stock]);
      }
    }
  }

  const cat = req.body.timeIntv;

  var s = [];
  var date = new Date();
  var todaysDate = convertDate(date);

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

    if (cat == "month")
    {      
      var lastDate = convertDateSubtractMonth(date);

        yahooFinance.historical({
        symbols: s,
        from: lastDate,
        to: todaysDate,
        period: 'd',  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only) 
      }, function (err, quotes) {
        if (err)
          {

          }
          else
          {
            //get categories
            var cats = [];
            for (var stock in quotes)
            {
              for (var d in quotes[stock])
              {
                cats.push(formatDateMMDD(quotes[stock][d].date));
              }
              break;
            }
            //format data
            var data = [];
            for (var stock in quotes)
            {
              var item = {name: quotes[stock][0].symbol, data: []};
              //populate data
              var tempData = [];
              for (var d in quotes[stock])
              {
                tempData.push(quotes[stock][d].close);
              }
              item.data = tempData;
              data.push(item);
            }
            res.render('stocksView', {title: 'Stocks View', user: req.user, stocks: data, ogStocks: s1, cats: cats });
          } 
      });
    }
    else if (cat == "day")
    {

      // //var test = readJsonFromUrl("http://dev.markitondemand.com/MODApis/Api/interactive?parameters=%7B%22Normalized%22:false,%22StartDate%22:%222013-07-15T00:00:00-00%22,%22EndOffsetDays%22:0,%22NumberOfDays%22:1,%22DataPeriod%22:%22Day%22,%22DataInterval%22:0,%22LabelPeriod%22:%22Hour%22,%22LabelInterval%22:1,%22ExtraPoints%22:0,%22Elements%22:%5B%7B%22Symbol%22:%22AAPL%22,%22ElementType%22:%22price%22,%22Params%22:%5B%22ohlc%22%5D%7D%5D,%22RealTime%22:false%7D");

      //   //   jQuery.getJSON("http://dev.markitondemand.com/MODApis/Api/interactive?parameters=%7B%22Normalized%22:false,%22StartDate%22:%222013-07-15T00:00:00-00%22,%22EndOffsetDays%22:0,%22NumberOfDays%22:1,%22DataPeriod%22:%22Day%22,%22DataInterval%22:0,%22LabelPeriod%22:%22Hour%22,%22LabelInterval%22:1,%22ExtraPoints%22:0,%22Elements%22:%5B%7B%22Symbol%22:%22AAPL%22,%22ElementType%22:%22price%22,%22Params%22:%5B%22ohlc%22%5D%7D%5D,%22RealTime%22:false%7D?callback=?", function(data) {
      //   // // Get the element with id summary and set the inner text to the result.
      //   // console.log
      //   //  });
 
      //     var allData = [];   
      //     //loop through other stocks
      //     for(var i = 0; i < req.user.stocks.length; i++)
      //     {
      //        PathLoader
      //       .load('https://chartapi.finance.yahoo.com/instrument/1.0/GOOG/chartdata;type=quote;range=1d/json')
      //       .then(function (document) 
      //       {   
      //         document = document.replace('finance_charts_json_callback( ', '');
      //         document = document.slice(0, -1);
      //         console.log(document);
      //         document = JSON.parse(document);

      //         var item = {name: document.meta.ticker.toUpperCase(), data: []};
      //         var tempData = [];
      //         for (var stock in document.series)
      //         {               
      //           //populate data               
      //           tempData.push(document.series[stock].close);
      //           // item.data = tempData;
      //           // data.push(item);
      //         }
      //         item.data = tempData;
      //         allData.push(item);
      //       });    
      //     }
      //     console.log(allData);
      //     // document = document.replace('finance_charts_json_callback( ', '');
      //     // document = document.slice(0, -1);
      //     // //console.log(document);
      //     // document = JSON.parse(document);

      //     var cats = [];
      //     // for (var stock in document.series)
      //     // {
      //     //   // for (var d in quotes[stock])
      //     //   // {
      //     //     cats.push(document.series[stock]);
      //     //   // }
      //     //   break;
      //     // }
      //     console.log(allData);
      //     res.render('stocksView', {title: 'Stocks View', user: req.user, stocks: data, cats: cats });
      var lastDate = convertDateSubtractDay(date, 1);

        yahooFinance.historical({
        symbols: s,
        from: lastDate,
        to: todaysDate,
        //TODO: get hourly stocks
        period: 'd',  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only) 
      }, function (err, quotes) {
        if (err)
          {

          }
          else
          {
            //get categories
            var cats = [];
            for (var stock in quotes)
            {
              for (var d in quotes[stock])
              {
                cats.push(formatDateMMDD(quotes[stock][d].date));
              }
              break;
            }
            //format data
            var data = [];
            for (var stock in quotes)
            {
              var item = {name: quotes[stock][0].symbol, data: []};
              //populate data
              var tempData = [];
              for (var d in quotes[stock])
              {
                tempData.push(quotes[stock][d].close);
              }
              item.data = tempData;
              data.push(item);
            }
            res.render('stocksView', {title: 'Stocks View', user: req.user, stocks: data, ogStocks: s1, cats: cats });
          } 
      });
    }
    else
    {
      var lastDate = convertDateSubtractDay(date, 7);

        yahooFinance.historical({
        symbols: s,
        from: lastDate,
        to: todaysDate,
        //TODO: get hourly stocks
        period: 'd',  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only) 
      }, function (err, quotes) {
        if (err)
          {

          }
          else
          {
            //get categories
            var cats = [];
            for (var stock in quotes)
            {
              for (var d in quotes[stock])
              {
                cats.push(formatDateMMDD(quotes[stock][d].date));
              }
              break;
            }
            //format data
            var data = [];
            for (var stock in quotes)
            {
              var item = {name: quotes[stock][0].symbol, data: []};
              //populate data
              var tempData = [];
              for (var d in quotes[stock])
              {
                tempData.push(quotes[stock][d].close);
              }
              item.data = tempData;
              data.push(item);
            }
            res.render('stocksView', {title: 'Stocks View', user: req.user, stocks: data, ogStocks: s1, cats: cats });
          } 
      });
    }
  }
  else
  {
    res.render('stocksView', {title: 'Stocks View', user: req.user, stocks: s, ogStocks: s, cats: cats  });
  }
});

router.get('/stocksView', ensureAuthenticated, function(req, res, next){
  //default is going to be month
  var s1 = [];

  if (req.user.stocks.length > 0)
  {
    for(var stock in req.user.stocks)
    {
      if (isNaN(parseInt(stock)))
      {    
      }
      else
      {
        s1.push(req.user.stocks[stock]);
      }
    }
  }

  var s = [];
  var date = new Date();
  var todaysDate = convertDate(date);
  var lastDate = convertDateSubtractMonth(date); 

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

    yahooFinance.historical({
      symbols: s,
      from: lastDate,
      to: todaysDate,
      period: 'd',  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only) 
    }, function (err, quotes) {
      if (err)
        {

        }
        else
        {
          //get categories
          var cats = [];
          for (var stock in quotes)
          {
            for (var d in quotes[stock])
            {
              cats.push(formatDateMMDD(quotes[stock][d].date));
            }
            break;
          }
          //format data
          var data = [];
          for (var stock in quotes)
          {
            var item = {name: quotes[stock][0].symbol, data: []};
            //populate data
            var tempData = [];
            for (var d in quotes[stock])
            {
              tempData.push(quotes[stock][d].close);
            }
            item.data = tempData;
            data.push(item);
          }
          res.render('stocksView', {title: 'Stocks View', user: req.user, stocks: data, ogStocks: s1, cats: cats });
        } 
    });
  }
  else
  {
     res.render('stocksView', {title: 'Stocks View', user: req.user, ogStocks: s1, stocks: s });
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

function convertDate(date) 
{
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth()+1).toString();
  var dd  = date.getDate().toString();

  var mmChars = mm.split('');
  var ddChars = dd.split('');

  return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
}

function convertDateSubtractMonth(date) 
{
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth()).toString();
  var dd  = date.getDate().toString();

  var mmChars = mm.split('');
  var ddChars = dd.split('');

  return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
}

function convertDateSubtractDay(date, days) 
{
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth()+1).toString();
  var dd  = (date.getDate()-days).toString();

  var mmChars = mm.split('');
  var ddChars = dd.split('');

  return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
}

function getDates(startDate, endDate) {
  var dates = [],
      currentDate = startDate,
      addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
};

function formatDateMMDD(date) 
{
  var day = date.getDate()+1;
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  return month + '/' + day;
}

module.exports = router;