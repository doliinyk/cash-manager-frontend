import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { CategoryStateModel } from 'shared/models/category';
import { CategoryExpenseService } from 'shared/services/user/category.expense.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnDestroy {
  categories: CategoryStateModel[] = [];
  titles: string[] = [];
  colors: string[] = [];
  values: number[] = [];
  pieChart: any;
  subscription: Subscription | undefined;

  constructor(private categoryService: CategoryExpenseService) {}

  ngOnInit(): void {
    this.subscription = this.categoryService.categories$.subscribe(categories => {
      if (categories && categories.length > 0) {
        this.categories = categories;
        this.updateChartData();
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  updateChartData() {
    this.titles = this.categories.map(category => category.title || 'Error');
    this.colors = this.categories.map(category => category.colorCode || '#fff');
    for (const key in this.categories) {
      this.values.push(10);
    }
    this.renderChart();
  }

  renderChart() {
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
        responsive: true,
        plugins: {
          datalabels: {
            formatter: (value: number, ctx: any): string => {
              let sum = 0;
              const dataArr: number[] = ctx.chart.data.datasets[0].data;
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
}
