import { Component, AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'home-card-flot-chart',
  templateUrl: './flot-chart.component.html',
  styleUrls: ['./flot-chart.component.less']
})
export class FlotChartComponent implements AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    $(function () {
      initRealTimeChart();
    });

    let data = [], totalPoints = 110;
    let data2 = [], totalPoints2 = 110;

    function initRealTimeChart() {
      const plot = ($ as any).plot('#real_time_chart', [],
        {
          grid: {
            borderColor: '#f3f3f3',
            borderWidth: 1,
            tickColor: '#f3f3f3'
          },
          yaxis: {
            min: 0,
            max: 100
          },
          xaxis: {
            min: 0,
            max: 100
          }
        });

      function updateRealTime() {
        plot.setData([{
          data: getRandomData(),
          shadowSize: 0,
          color: 'rgb(0, 0, 212)',
          lines: {
            fill: true
          }
        },
        {
          data: getRandomData2(),
          shadowSize: 0,
          color: 'rgb(300, 100, 100)',
          lines: {
            fill: true
          }
        }]);

        let ticks = plot.getAxes().xaxis.options.showTicks = true;

        plot.setupGrid();
        plot.draw();

        setTimeout(updateRealTime, 1000);
      }

      updateRealTime();

      function getRandomData() {
        if (data.length > 0) data = data.slice(1);

        while (data.length < totalPoints) {
          var prev = data.length > 0 ? data[data.length - 1] : 50, y = prev + Math.random() * 10 - 5;
          if (y < 0) { y = 0; } else if (y > 100) { y = 100; }

          data.push(y);
        }

        var res = [];
        for (var i = 0; i < data.length; ++i) {
          res.push([i, data[i]]);
        }

        return res;
      }

      function getRandomData2() {
        var res = [];
        for (var i = 0; i < totalPoints2; ++i) {
          res.push([i, Math.random() * 20]);
        }

        return res;
      }
    }
  }
}
