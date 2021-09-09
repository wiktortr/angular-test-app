import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
Exporting(Highcharts);

@Component({
  selector: 'app-chart-page',
  templateUrl: './chart-page.component.html',
  styleUrls: ['./chart-page.component.scss'],
})
export class ChartPageComponent implements AfterViewInit {
  @ViewChild('container') container!: ElementRef<HTMLElement>;
  chart!: Highcharts.Chart;

  avalibleFruits = ['Raspberries', 'Blueberries', 'Pears', 'Mango'];

  constructor() {}

  ngAfterViewInit(): void {
    this.chart = Highcharts.chart(
      <Highcharts.HTMLDOMElement>this.container.nativeElement,
      {
        chart: {
          type: 'bar',
        },
        title: {
          text: 'Fruit Consumption',
        },
        xAxis: {
          categories: ['Apples', 'Bananas', 'Oranges'],
        },
        yAxis: {
          title: {
            text: 'Fruit eaten',
          },
        },
        series: [
          {
            name: 'Jane',
            data: [1, 0, 4],
            type: 'bar',
          },
          {
            name: 'John',
            data: [5, 7, 3],
            type: 'bar',
          },
        ],
      },
      (e) => console.log(e)
    );
  }

  addNewFruit() {
    if (!this.chart) return;
    if (this.avalibleFruits.length == 0) return;
    let idx = Math.floor(Math.random() * this.avalibleFruits.length);
    let fruit = this.avalibleFruits[idx];
    this.avalibleFruits.splice(idx, 1);
    this.chart.xAxis[0].setCategories([
      ...this.chart.xAxis[0].categories,
      fruit,
    ]);
    this.chart.series[0].addPoint(Math.floor(Math.random() * 10));
    this.chart.series[1].addPoint(Math.floor(Math.random() * 10));
  }
}
