// //var yahooFinance = require('yahoo-finance');


// $(function () {

//     alert("working?");

//     var t = document.getElementById("xxx");
//     alert(t);

//     var linechart = Highcharts.chart({
//         chart: {
//             renderTo: 'container',
//             plotBackgroudColor: {
//             linearGradient: [0, 0, 500, 500],
//             stops: [
//                 [0, 'rgb(255, 255, 255)'],
//                 [1, 'rgb(200, 200, 255)']
//                 ]
//             },
//             plotBorderWidth: 5,
//         },
//         title:{
//             text: 'Your Companies Over Time'
//         },
//         tooltip: {
//             pointFormat: '{series.name}: <b>{point.y}</b><br/>',
//         },
//         xAxis: {
//         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
//         },
//         plotOptions: {
//                 series: {
//                     events: {
//                         hide: function () {
//                             var text = 'The series was just hidden (#' + n + ')';
//                             if (!this.chart.lbl) {
//                                 this.chart.lbl = this.chart.renderer.label(text, 100, 70)
//                                     .attr({
//                                         padding: 10,
//                                         r: 5,
//                                         fill: Highcharts.getOptions().colors[1],
//                                         zIndex: 5
//                                     })
//                                     .css({
//                                         color: '#FFFFFF'
//                                     })
//                                     .add();
//                             } else {
//                                 this.chart.lbl.attr({
//                                     text: text
//                                 });
//                             }
//                             n = n + 1;
//                         }
//                     }
//                 }
//             },        
//         series: [{
//             // color: 'red',
//             name: 'Firefox',
//             data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
//         }, {
//             // color: 'yellow',
//             name: 'IE',
//             data: [10, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
//         }, {
//             // color: 'blue',
//             name: 'Chrome',
//             data: [5, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
//         }, {
//             // color: 'pink',
//             name: 'Safari',
//             data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
//         }, {
//             // color: 'violet',
//             name: 'Opera',
//             data: [7.9, 5.2, 2.7, 9.5, 1.9, 5.2, 7.0, 6.6, 4.2, 1.3, 16.6, 14.8]
//         }, {
//             // color: 'green',
//             name: 'Others',
//             data: [15, 10.6, 13.5, 18.4, 3.5, 7.0, 8.6, 7.9, 4.3, 19.0, 13.9, 11.0]
//         }]
//     });
//     var piechart = Highcharts.chart({
//         chart: {
//             renderTo: 'container_a',
//             plotBackgroundColor: null,
//             plotBorderWidth: null,
//             plotShadow: false,
//             events: {
//                 redraw: function () {
//                     //update sliders   
//                     $.each(chart.series[0].points, function (i, point) {
//                         console.log(point.slider, point);
//                         point.slider.slider('value', point.percentage);
//                     });
//                 }
//             }
//         },
//         title: {
//             text: 'Browser market shares at a specific website, 2010'
//         },
//         tooltip: {
//             pointFormat: '{series.name}: <b>{point.percentage}%</b>',
//             percentageDecimals: 1
//         },
//         plotOptions: {
//             pie: {
//                 allowPointSelect: true,
//                 cursor: 'pointer',
//                 dataLabels: {
//                     enabled: false
//                 },
//                 showInLegend: true
//             }
//         },
        
//         series: [{
//             type: 'pie',
//             name: 'Browser share',
//             data: [
//                 ['Firefox', 10.0],
//                 ['IE', 10],
//                 ['Chrome', 10],
//                 ['Safari', 10],
//                 ['Opera', 10],
//                 ['Others', 50]
//             ]
//         }]
//     });
// });