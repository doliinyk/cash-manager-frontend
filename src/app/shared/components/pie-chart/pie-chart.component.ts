import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { CategoryService } from 'shared/services/user/category.service';
import { CategoryStateModel } from 'shared/models/category';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements AfterViewInit, OnDestroy {
  categories?: CategoryStateModel[];
  titles?: (string | undefined)[];
  colors?: (string | undefined)[];
  values?: (number | undefined)[];
  @Input() pieChart: any;
  private subscription: Subscription;

  constructor(private categoryService: CategoryService) {
    this.subscription = this.categoryService.getCategoriesObservable().subscribe(categories => {
      this.categories = categories;
      this.colors = this.categories.map(category => category.color);
      this.titles = this.categories.map(category => category.title);
      this.values = this.categories.map(category => category.data);
      this.RenderChart();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  RenderChart() {
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

  ngAfterViewInit() {
    if (this.pieChart) {
      this.pieChart.update();
    }
  }
}
