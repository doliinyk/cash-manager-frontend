import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { CategoryStateModel } from 'shared/models/category';
import { CategoryService } from 'shared/services/user/category.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  categories: CategoryStateModel[] = [];
  titles: string[] = [];
  colors: string[] = [];
  values: number[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    const categoriesObs = this.categoryService.getCategories();
    categoriesObs.subscribe(category => {
      for (const key in category) {
        this.categories.push({ color: this.categoryService.hexToRgbA(key), title: category[key].title });
        this.values.push(10);
      }
      this.titles = this.categories.map(category => category.title || 'Error');
      this.colors = this.categories.map(category => category.color || '#fff');
      this.RenderChart();
    });
  }

  RenderChart() {
    new Chart('pieChart', {
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
