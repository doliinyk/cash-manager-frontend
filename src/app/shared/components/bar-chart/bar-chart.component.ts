import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements OnInit {
  labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  data = {
    labels: this.labels,
    datasets: [
      {
        label: 'Прибутки',
        data: [10, 100, 10, 10, 100, 10, 10, 100, 10, 10, 10, 10],
        backgroundColor: 'rgba(83, 179, 240, 0.58)',
        borderColor: 'rgba(44, 129, 242, 0.8)',
        borderWidth: 2,
        barPercentage: 1,
        categoryPercentage: 1,
        borderRadius: 20,
        borderSkipped: false
      },
      {
        label: 'Витрати',
        data: [-100, -10, -10, -10, -10, -100, -10, -10, -10, -10, -10, -10],
        backgroundColor: 'rgba(236, 103, 118, 0.58)',
        borderColor: 'rgba(234, 34, 61, 0.8)',
        borderWidth: 2,
        barPercentage: 1,
        categoryPercentage: 1,
        borderRadius: 20,
        borderSkipped: false
      }
    ]
  };

  ngOnInit() {
    this.RenderChart();
  }

  RenderChart() {
    new Chart('barChart', {
      type: 'bar',
      data: this.data,
      options: {
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              display: false
            }
          }
        },
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: false
          }
        }
      }
    });
  }
}
