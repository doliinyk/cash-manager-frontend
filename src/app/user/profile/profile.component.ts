import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth/auth.service';
import { Observable } from 'rxjs';
import { UserStateModel } from 'shared/models/user';
import { Chart, registerables } from 'chart.js';
import { CategoryStateModel } from 'shared/models/category';
import { MatDialog } from '@angular/material/dialog';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables);
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  protected user?: Observable<UserStateModel> = this.authService.user$;
  hasAvatar: boolean = false;
  isEditMode: boolean = false;
  userName?: string;
  userEmail?: string;
  tempUserName?: string = '';
  tempUserEmail?: string = '';
  pieChart: any;

  categories: CategoryStateModel[] = [
    // Треба витащити трати і об'єднати з тим масивом
    // Для тесту, оскільки не єбу де зараз брати категорії
    { id: 0, color: 'green', title: 'green' },
    { id: 1, color: 'red', title: 'red' },
    { id: 2, color: 'blue', title: 'blue' },
    { id: 3, color: 'yellow', title: 'yellow' },
    { id: 4, color: 'orange', title: 'orange' },
    { id: 5, color: 'gray', title: 'gray' },
    { id: 6, color: 'violet', title: 'violet' }
  ];

  percentage: number[] = [10, 10, 10, 10, 10, 10, 40];

  openPasswordDialog() {
    this.dialog.open(PasswordDialogComponent);
  }

  openCategoryDialog() {
    this.dialog.open(CategoryDialogComponent);
  }

  public ngOnInit(): void {
    this.RenderChart();
    this.user?.subscribe(data => {
      this.userName = data.login?.toString();
      this.userEmail = data.email;
    });
  }

  RenderChart() {
    const titles = this.categories.map(category => category.title);
    const colors = this.categories.map(category => category.color);
    this.pieChart = new Chart('pieChart', {
      type: 'doughnut',
      data: {
        labels: titles,
        datasets: [
          {
            data: this.percentage,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1
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
            color: '#fff',
          },
          legend: {
            display: false
          }
        }
      }
    });
  }

  categoryItemClick(id: number | undefined) {
    if (!id) id = 0
    this.pieChart.legend.options.onClick(null, this.pieChart.legend.legendItems[id], this.pieChart.legend);
  }

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  toEditMode() {
    this.tempUserName = this.userName;
    this.tempUserEmail = this.userEmail;
    this.isEditMode = true;
  }

  saveChanges() {
    this.isEditMode = false;
  }

  declineChanges() {
    this.userName = this.tempUserName;
    this.userEmail = this.tempUserEmail;
    this.isEditMode = false;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
  }
}
