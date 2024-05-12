import {Component, Input, OnInit} from '@angular/core';
import {Chart} from "chart.js";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements OnInit {
  @Input() barChart: any;
  labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  data = {
    labels: this.labels,
    datasets: [
      {
        label: 'Прибутки',
        data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        backgroundColor: 'blue'
      },
      {
        label: 'Витрати',
        data: [-10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10],
        backgroundColor: 'red'
      }
    ]
  };

  ngOnInit() {
    this.RenderChart();
  }

  RenderChart() {
    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: this.data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true
          }
        }
      }
    });
  }
}
