import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Observable } from 'rxjs';
import { UserStateModel } from 'shared/models/user';
import { AuthService } from 'shared/services/auth/auth.service';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';
import { CategoriesService } from 'shared/services/categories/categories.service';

Chart.register(...registerables);
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  protected user?: Observable<UserStateModel> = this.authService.user$;
  @ViewChild('nameField') nameField: ElementRef;
  @ViewChild('emailField') emailField: ElementRef;
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

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    protected categoriesService: CategoriesService
  ) {}

  toEditMode() {
    this.tempUserName = this.nameField.nativeElement.value;
    this.tempUserEmail = this.emailField.nativeElement.value;
    this.isEditMode = true;
  }

  saveChanges() {
    if (
      this.tempUserName !== this.nameField.nativeElement.value ||
      this.tempUserEmail !== this.emailField.nativeElement.value
    ) {
      this.authService.changeUserNameAndEmail(this.nameField.nativeElement.value, this.emailField.nativeElement.value);
    }
    this.authService.getUserByLogin();
    this.isEditMode = false;
  }

  declineChanges() {
    this.authService.getUserByLogin();
    this.isEditMode = false;
  }
}
