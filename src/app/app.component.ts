import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private ds : DataService){

  }

  lineChart;

  ngOnInit(): void {
    this.ds.getChartData(1000).subscribe(res => {
      this.createChart(res)
    })
  }

  createChart(apiData){
    this.lineChart = new Chart({
      // title: {
      //     text: 'Monthly Average Temperature',
      //     x: -20 //center
      // },
      // subtitle: {
      //     text: 'Source: WorldClimate.com',
      //     x: -20
      // },
      xAxis: {

      },
      yAxis: {
          title: {
              text: 'Risk'
          },
          plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
          }]
      },
      tooltip: {
          // valueSuffix: '°C'
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          borderWidth: 0
      },
      series: [{
          name: 'Risk 99',
          data: apiData.map(t => t[0].res99)
      }as any, {
          name: 'Risk 95',
          data: apiData.map(t => t[0].res95)
      }]
    });
  }
}
