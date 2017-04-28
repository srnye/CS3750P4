$(function () {
    //define local variables
    var dayBtn = document.getElementById("dayBtn");
    var weekBtn = document.getElementById("weekBtn");
    var monthBtn = document.getElementById("monthBtn");
    var stockData = document.getElementById("stockData");
    var categories = document.getElementById("categories");
    var timeIntv = document.getElementById("timeIntv");
    var intvForm = document.getElementById("intvForm");
    var stocks = document.getElementById("ogStocks");

    stocks = JSON.parse(stocks.value);

    var linechart = Highcharts.chart({
        chart: {
            renderTo: 'container',
            plotBackgroudColor: {
            linearGradient: [0, 0, 500, 500],
            stops: [
                [0, 'rgb(255, 255, 255)'],
                [1, 'rgb(200, 200, 255)']
                ]
            },
            plotBorderWidth: 5,
        },
        title:{
            text: 'Your Companies Over Time'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b><br/>',
        },
        xAxis: {
        categories: JSON.parse(categories.value)
        },
        plotOptions: {
                series: {
                    events: {
                        hide: function () {
                            var text = 'The series was just hidden (#' + n + ')';
                            if (!this.chart.lbl) {
                                this.chart.lbl = this.chart.renderer.label(text, 100, 70)
                                    .attr({
                                        padding: 10,
                                        r: 5,
                                        fill: Highcharts.getOptions().colors[1],
                                        zIndex: 5
                                    })
                                    .css({
                                        color: '#FFFFFF'
                                    })
                                    .add();
                            } else {
                                this.chart.lbl.attr({
                                    text: text
                                });
                            }
                            n = n + 1;
                        }
                    }
                }
            },        
        series: JSON.parse(stockData.value)
    });

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

    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container_a',
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

    //functions
    dayBtn.onclick = function()
    {
        timeIntv.value = "day";

        intvForm.submit();
    }

    weekBtn.onclick = function()
    {
        timeIntv.value = "week";

        intvForm.submit();
    }

    monthBtn.onclick = function()
    {
        timeIntv.value = "month";

        intvForm.submit();
    }

});