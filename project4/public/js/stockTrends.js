
var yahooFinance = require('yahoo-finance');

$(function () 
{
    var stocksTable = document.getElementById("stocksTable");
    var user = document.getElementById("user");

    for(stock in JSON.parse(user.value).stocks)
    {
        yahooFinance.snapshot(
        {
            symbol: 'AAPL',
            fields: ['o', 'c1', 's', 'n'],
        }, function (err, snapshot) 
        {
        //... 
            if (err)
            {

            }
            else
            {

                var linechart = Highcharts.chart(
                {
                    chart: 
                    {
                        renderTo: 'container',
                        plotBackgroudColor: 
                        {
                            linearGradient: [0, 0, 500, 500],
                            stops: [
                                [0, 'rgb(255, 255, 255)'],
                                [1, 'rgb(200, 200, 255)']
                                ]
                        },
                        plotBorderWidth: 5,
                    },
                    title:
                    {
                        text: 'Your Companies Over Time'
                    },
                    tooltip: 
                    {
                        pointFormat: '{series.name}: <b>{point.y}</b><br/>',
                    },
                    xAxis: 
                    {
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    },
                    plotOptions: 
                    {
                            series: 
                            {
                                events: 
                                {
                                    hide: function () 
                                    {
                                        var text = 'The series was just hidden (#' + n + ')';
                                        if (!this.chart.lbl) 
                                        {
                                            this.chart.lbl = this.chart.renderer.label(text, 100, 70)
                                                .attr(
                                                    {
                                                        padding: 10,
                                                        r: 5,
                                                        fill: Highcharts.getOptions().colors[1],
                                                        zIndex: 5
                                                })
                                                .css(
                                                {
                                                    color: '#FFFFFF'
                                                })
                                                .add();
                                        } else 
                                        {
                                            this.chart.lbl.attr(
                                            {
                                                text: text
                                            });
                                        }
                                        n = n + 1;
                                    }
                                }
                            }
                    },        
                    series: [
                    {
                        // color: 'red',
                        name: snapshot.name,
                        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                    }, 
                    ]
                });
                var piechart = Highcharts.chart(
                {
                    chart: 
                    {
                        renderTo: 'container_a',
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        events: 
                        {
                            redraw: function () 
                            {
                                //update sliders   
                                $.each(chart.series[0].points, function (i, point) 
                                {
                                    console.log(point.slider, point);
                                    point.slider.slider('value', point.percentage);
                                });
                            }
                        }
                    },
                    title: 
                    {
                        text: 'Browser market shares at a specific website, 2010'
                    },
                    tooltip: 
                    {
                        pointFormat: '{series.name}: <b>{point.percentage}%</b>',
                        percentageDecimals: 1
                    },
                    plotOptions: 
                    {
                        pie: 
                        {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: 
                            {
                                enabled: false
                            },
                            showInLegend: true
                        }
                    },
                    series: 
                    [
                        {
                            type: 'pie',
                            name: 'Browser share',
                            data: 
                            [
                                ['Firefox', 10.0],
                                ['IE', 10],
                                ['Chrome', 10],
                                ['Safari', 10],
                                ['Opera', 10],
                                ['Others', 50]
                            ]
                        }
                    ]
                });
            }
        });
    }
 });