import { Component, AfterViewInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { SizableChartQueue } from 'src/app/models/datastructures/custom/ds-sizable-chart-queue.model';
declare var $: any;

const successesQueue: SizableChartQueue = new SizableChartQueue(100, 0);
const failureQueue: SizableChartQueue = new SizableChartQueue(100, 0);

@Component({
  selector: 'home-card-flot-chart',
  templateUrl: './flot-chart.component.html',
  styleUrls: ['./flot-chart.component.less']
})
export class FlotChartComponent implements AfterViewInit {

  constructor(public homeService: HomeService) { }

  ngAfterViewInit(): void {
    $(function () {
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

      function setPlotData() {
        if (typeof plot === 'undefined') {
          return;
        }

        plot.setData([{
          data: successesQueue._store,
          shadowSize: 0,
          color: 'rgb(0, 0, 212)',
          lines: {
            fill: true
          }
        },
        {
          data: failureQueue._store,
          shadowSize: 0,
          color: 'rgb(300, 100, 100)',
          lines: {
            fill: true
          }
        }]);

        let ticks = plot.getAxes().xaxis.options.showTicks = true;
        plot.setupGrid();
        plot.draw();

        setTimeout(setPlotData, 5000);
      }

      setPlotData();
    });

    //@@ Push to stack when data returned from server
    this.homeService.homeData$.subscribe(hd => {
      successesQueue.push(hd.realtimeData.msgStatus.successes);
    });

    this.homeService.homeData$.subscribe(hd => {
      failureQueue.push(hd.realtimeData.msgStatus.failures)
    });
  }
}
