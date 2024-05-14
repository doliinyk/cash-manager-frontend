import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth/auth.service';
import { Observable, of } from 'rxjs';
import { UserStateModel } from 'shared/models/user';
import { Chart, registerables } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CategoryService } from 'shared/services/user/category.service';
import { PieChartComponent } from 'shared/components/pie-chart/pie-chart.component';
import { CategoryStateModel } from 'shared/models/category';

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
  categories: CategoryStateModel[] = [];

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
    const categoriesObs = this.categoryService.getCategories();
    categoriesObs.subscribe(category => {
      for (let key in category) {
        this.categories.push({ color: key, title: category[key].title });
      }
      console.log(this.categories.map(category => category.title|| 'Nihuya'))
    })
    console.log("Init")
    console.log(this.categories)
    console.log(this.categories.map(category => category.title|| 'Nihuya'))
  }

  categoryItemClick(id: number | undefined) {
    if (!id) id = 0;
    this.pieChart.legend.options.onClick(null, this.pieChart.legend.legendItems[id], this.pieChart.legend);
  }

  constructor(
    private authService: AuthService,
    protected categoryService: CategoryService,
    private dialog: MatDialog
  ) {}

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
