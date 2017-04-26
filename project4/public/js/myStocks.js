var yahooFinance = require('yahoo-finance');

window.onload = function() 
{    
    var stocksTable = document.getElementById("stocksTable");
    var user = document.getElementById("user");

    for(stock in JSON.parse(user.value).stocks)
    {
        yahooFinance.snapshot({
        symbol: 'AAPL',
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

            var tr = document.createElement("tr");
            var td = document.createElement("td");
            var txt = document.createTextNode(snapshot.name);

            td.appendChild(txt);
            tr.appendChild(td);

            td = document.createElement("td");
            txt = document.createTextNode(snapshot.open);

            td.appendChild(txt);
            tr.appendChild(td);

            td = document.createElement("td");
            txt = document.createTextNode(snapshot.change);

            td.appendChild(txt);
            tr.appendChild(td);

            td = document.createElement("td");
            txt = document.createTextNode(snapshot.symbol);

            td.appendChild(txt);
            tr.appendChild(td);

            roundResultsTable.appendChild(tr);
        }
        });

    }
}