$(function () {
    var chart = Highcharts.chart({
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
            plotShadow: true
        },
        title:{
            text: 'This is a test'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b><br/>',
        },
        // plotOptions:{
             xAxis: {
               categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
             },
        // },
        plotOptions: {
            series: {
                color: '#FF0000'
                }
            },
        series: [{
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        }]
            // line: {
            //     allowPointSelect: true,
            //     cursor: 'pointer',
            //     dataLabels:{
            //         enabled: true
            //     },
            //     showInLegend: true
            // }
        // },
        // series: [{
        //     type: 'line',
        //     name: 'test',
        //     data: [
        //         ['Firefox', 10.0],
        //         ['IE', 10],
        //         ['Chrome', 10],
        //         ['Safari', 10],
        //         ['Opera', 10],
        //         ['Others', 50]
        //     ]
        // }]
    })
});