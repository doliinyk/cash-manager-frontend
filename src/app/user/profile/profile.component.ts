import {AfterViewInit, Component, OnInit} from '@angular/core';
import { AuthService } from 'shared/services/auth/auth.service';
import { Observable } from 'rxjs';
import { UserStateModel } from 'shared/models/user';
import { Chart, registerables } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CategoryService } from 'shared/services/user/category.service';
import {CategoryStateModel} from "shared/models/category";

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
  categories: CategoryStateModel[];

  openPasswordDialog() {
    this.dialog.open(PasswordDialogComponent);
  }

  openCategoryDialog() {
    this.dialog.open(CategoryDialogComponent);
  }

  public ngOnInit(): void {
    this.user?.subscribe(data => {
      this.userName = data.login?.toString();
      this.userEmail = data.email;
    });
    this.RenderChart();
  }

  categoryItemClick(id: number | undefined) {
    if (!id) id = 0;
    this.pieChart.legend.options.onClick(null, this.pieChart.legend.legendItems[id], this.pieChart.legend);
  }

  constructor(
    private authService: AuthService,
    protected categoryService: CategoryService,
    private dialog: MatDialog
  ) {
    this.categories = this.categoryService.getCategories();
    console.log(this.categories)
  }

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

  RenderChart() {
    let colors = this.categories.map(category => category.color);
    let titles = this.categories.map(category => category.title);
    let data = this.categories.map(category => category.data);
    console.log(colors)
    this.pieChart = new Chart('pieChart', {
      type: 'doughnut',
      data: {
        labels: titles,
        datasets: [
          {
            data: data,
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
