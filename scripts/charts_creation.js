

$( window ).load(function() {

            // When the window is fully loaded
            VoltMeter = Highcharts.chart('AlbertVoltMeter', {
                chart: {
                    type: 'gauge', 
                    plotBackgroundColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                            stops: [[0, '#aae17c'], [0.4, '#FFFFFF'], [1, '#aae17c'] ]
                    },
                    height: 120
                },
                title: { floating: false, verticalAlign: 'bottom', text: '<span style="font-size:10px">Voltage</span>' },
                navigation: {
                    buttonOptions: { enabled: false }
                },
                credits: { enabled: false },
                pane: [{
                    startAngle: -45, endAngle: 45,
                    background: [{ borderWidth: 0, outerRadius: '109%'}],
                    center: ['50%', '170%'], size: 200
                }],
                yAxis: [{
                    min: 9.5, max: 12.5, minorTickPosition: 'outside', tickPosition: 'outside',
                    tickInterval: 1, tickWidth: 0,
                    labels: { rotation: 'auto', distance: 15 },
                    plotBands: [{ from: 9.5, to: 10,
                        color: '#F4FA58', innerRadius: '100%', outerRadius: '105%'
                    }, { from: 10, to: 12,
                        color: '#82FA58', innerRadius: '100%', outerRadius: '105%'
                    },{ from: 12, to: 12.5,
                        color: '#FA5858', innerRadius: '100%', outerRadius: '105%'
                    }],
                    pane: 0
                }],
                plotOptions: {
                    gauge: { dataLabels: { enabled: false }, dial: { radius: '100%'}}
                },
                series: [{
                    name: 'Input Voltage', data: [9], yAxis: 0, tooltip: {valueSuffix: 'V'}, id: 'vlt'
                }]
            });

            LidarDisplay = Highcharts.chart('AlbertLidar', {
                chart: { polar: true, animation: false },
                title: { text: 'Lidar view'},
                subtitle: { text: 'real time refresh'},
                credits: { enabled: false },
                pane: {
                    startAngle: -90, endAngle: 90, /* angle of the display widget */
                    center: ['50%', '95%'], size: 300,
                },
                yAxis: {
                    min: 0, softMax: 2, tickInterval: 1, 
                },
                xAxis : {
                    min: -90 , max: 90, tickInterval: 10,
                    labels: {format: '{value}°'                    },
                    plotBands: [
                        { from: -90, to: -30,
                        color: '#eeeeee', innerRadius: '0%', outerRadius: '100%'
                        },{ from: -30, to: -10,
                            color: '#f7afc1', innerRadius: '0%', outerRadius: '100%'
                        },{ from: -10, to: 10,
                            color: '#bdf7af', innerRadius: '0%', outerRadius: '100%'
                        },{ from: 10, to: 30,
                            color: '#f7afc1', innerRadius: '0%', outerRadius: '100%'
                        },{ from: 30, to: 90,
                            color: '#eeeeee', innerRadius: '0%', outerRadius: '100%'
                        }
                ]
                },
                plotOptions: {
                    series: {pointStart: 0, pointInterval: 1},
                    column: {pointPadding: 0, groupPadding: 0}
                },
                series: [ {type: 'area', name: 'Lidar zone', data: [0], id: 'lidar'},
                          {type: 'area', name: 'Cam zone', data: [0], id: 'lidar2'}
            ]
                    
            });

        });

        