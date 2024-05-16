import {Component, OnDestroy, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {Subject, Subscription, takeUntil} from 'rxjs';
import {CategoryStateModel} from 'shared/models/category';
import {CategoriesService} from "shared/services/categories/categories.service";

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
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit(): void {
     this.categoriesService.expenseCategories$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.updateChartData(data)
    })
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  updateChartData(data: CategoryStateModel[]) {
    this.values = [];
    this.titles = data.map(category => category.title || 'Error');
    this.colors = data.map(category => category.colorCode || '#fff');
    for (const key in data) {
      this.values.push(10);
    }
    this.renderChart();
  }

  renderChart() {
    if (this.pieChart)
      this.pieChart.destroy();
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
