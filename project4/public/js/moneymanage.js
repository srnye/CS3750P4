$(function () {
    
    var user = document.getElementById("myUser");
    var stocks = document.getElementById("myStocks");

    console.log(stocks);
    
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
            text: 'Browser market shares at a specific website, 2010'
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
            name: 'Browser share',
            data: [
                ['Firefox', 10.0],
                ['IE', 10],
                ['Chrome', 10],
                ['Safari', 10],
                ['Opera', 10],
                ['Others', 50]
            ]
        }]
    });
    var pointsLength = chart.series[0].data.length;
    $.each(chart.series[0].points, function (i, point) {
        $('<input name="slider[]">').val(point.y).appendTo('#sliders')
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
                            y: p.y - step
                        })
                    }
                });
                chart.series[0].setData(data);
                $(this).prev().val(ui.value)
            }
        })
        point.slider.children('a').css('background', point.color).text('    ' + point.legendItem.textStr)
    })
});