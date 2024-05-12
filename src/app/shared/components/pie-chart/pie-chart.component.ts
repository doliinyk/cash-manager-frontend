import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { CategoryService } from 'shared/services/user/category.service';
import { CategoryStateModel } from 'shared/models/category';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements AfterViewInit, OnInit, OnDestroy {
  categories?: CategoryStateModel[];
  titles: string[] = [];
  colors: string[] = [];
  values: number[] = [];
  @Input() pieChart: any;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
    const titles = this.categories.map(category => category.title);
    const colors = this.categories.map(category => category.color);
    console.log(this.categories);
    console.log(this.titles);
    this.RenderChart(titles, colors);
  }

  ngOnDestroy() {}

  RenderChart(titles: (string | undefined)[], colors: (string | undefined)[]) {
    this.pieChart = new Chart('pieChart', {
      type: 'doughnut',
      data: {
        labels: this.titles,
        datasets: [
          {
            data: this.values,
            backgroundColor: this.colors
          }
        ]
      },
      options: {
        plugins: {
          datalabels: {
            formatter: (value: number, ctx: any): string => {
              let sum = 0;
              let dataArr: number[] = ctx.chart.data.datasets[0].data;
              dataArr.map((data: number) => {
                sum += data;
              });
              return ((value * 100) / sum).toFixed(2) + '%';
            },
            color: '#fff'
          },
          legend: {
            display: false
          }
        }
      }
    });
  }

  ngAfterViewInit() {}
}
