import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Observable, Subscription } from 'rxjs';
import { CategoryStateModel } from 'shared/models/category';
import { UserStateModel } from 'shared/models/user';
import { AuthService } from 'shared/services/auth/auth.service';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';
import {CategoriesService} from "shared/services/categories/categories.service";
import {Categories} from "shared/enums/categories";

Chart.register(...registerables);
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  protected user?: Observable<UserStateModel> = this.authService.user$;
  isEditMode: boolean = false;
  userName?: string;
  userEmail?: string;
  tempUserName?: string = '';
  tempUserEmail?: string = '';

  openPasswordDialog() {
    this.dialog.open(PasswordDialogComponent);
  }

  openCategoryDialog() {
    this.dialog.open(CategoryDialogComponent);
  }

  public ngOnInit(): void {
    this.categoriesService.getAllCategories();
  }

  public ngOnDestroy(): void {

  }

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    protected categoriesService: CategoriesService
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
}
