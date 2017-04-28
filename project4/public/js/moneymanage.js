$(function () {
    
    var user = document.getElementById("myUser");
    var stocks = document.getElementById("myStocks");
    var newStocks = document.getElementById("newStocks");
    
    stocks = JSON.parse(stocks.value);

    var tempStock = [];
    var reserve = 100;
    for(var stock in stocks)
    {
        var s = stocks[stock];
        var item = [];
        item.push(s.name);
        item.push(s.percentage);
        tempStock.push(item);
        reserve -= s.percentage;
    }

    var item = [];
    item.push('Reserve');
    item.push(reserve);
    tempStock.push(item);
    
    // Build the chart
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            events: {
                redraw: function () {
                    //update sliders   
                    $.each(chart.series[0].points, function (i, point) {
                        console.log(point.slider, point);
                        point.slider.slider('value', point.percentage);
                    });
                }
            }
        },
        title: {
            text: 'Your Stock Percentages'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage}%</b>',
            percentageDecimals: 1
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            type: 'pie',
            name: 'Stock Percentage',
            data: tempStock
        }]
    });
    var pointsLength = chart.series[0].data.length;
    var index = 0;
    $.each(chart.series[0].points, function (i, point) {
        //$('<input name="slider[]">').val(point.y).appendTo('#sliders')
        $('<p>'+chart.series[0].data[index].name+'</p>').appendTo('#sliders')
        point.slider = $('<div></div>').appendTo('#sliders').slider({
            value: point.y,
            max: 100,
            min: 0,
            slide: function (event, ui) {
                var prevVal = point.y,
                    step = (ui.value - point.y) / (pointsLength - 1),
                    data = [],
                    newVal;
                
                $.each(chart.series[0].points, function(i, p){
                    if(p === point) {
                        data.push({
                            name: p.name,
                            y: ui.value
                        })
                    } else {
                        data.push({
                            name: p.name,
                            y: p.y
                        })
                    }
                });
                chart.series[0].setData(data);
                $(this).prev().val(ui.value)
            }
        })
        point.slider.children('a').css('background', point.color).text('    ' + point.legendItem.textStr)
        index++;
    })

    // save button
    var saveBtn = document.getElementById("saveBtn");
    var tempNewStocks = [];
    saveBtn.onclick = function()
    {
        for(var stock in stocks)
        {
            var item = {symbol: stocks[stock].symbol, name: stocks[stock].name, percentage: chart.series[0].data[stock].percentage};
            tempNewStocks.push(item);
        }
        newStocks.value = JSON.stringify(tempNewStocks);
        document.getElementById("stockForm").submit();
    };
    
});