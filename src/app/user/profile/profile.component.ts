import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth/auth.service';
import { Observable } from 'rxjs';
import { UserStateModel } from 'shared/models/user';
import { Chart, registerables } from 'chart.js';
import { CategoryStateModel } from 'shared/models/category';

Chart.register(...registerables);

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
  userPassword: string = '12345678';
  tempUserName?: string = '';
  tempUserEmail?: string = '';
  tempUserPassword: string = '';
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
            label: '%',
            data: [10, 10, 10, 10, 10, 10, 40],
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  categoryItemClick(id: number | undefined) {
    if (!id) this.pieChart.legend.options.onClick(null, this.pieChart.legend.legendItems[0], this.pieChart.legend);
    else this.pieChart.legend.options.onClick(null, this.pieChart.legend.legendItems[id], this.pieChart.legend);
  }

  constructor(private authService: AuthService) {}

  toEditMode() {
    this.tempUserName = this.userName;
    this.tempUserEmail = this.userEmail;
    this.tempUserPassword = this.userPassword;
    this.isEditMode = true;
  }

  saveChanges() {
    this.isEditMode = false;
  }

  declineChanges() {
    this.userName = this.tempUserName;
    this.userEmail = this.tempUserEmail;
    this.userPassword = this.tempUserPassword;
    this.isEditMode = false;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
  }
}
