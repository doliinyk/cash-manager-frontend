import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'shared/modules/material.module';
import { UserRoutingModule } from './user-routing.module';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileComponent } from './profile/profile.component';
import {CategoryDialogComponent} from "./category-dialog/category-dialog.component";
import {PasswordDialogComponent} from "./password-dialog/password-dialog.component";
import {PieChartComponent} from "shared/components/pie-chart/pie-chart.component";

@NgModule({
  declarations: [PaymentsComponent, ProfileComponent, CategoryDialogComponent, PasswordDialogComponent, PieChartComponent],
  exports: [PaymentsComponent, ProfileComponent, CategoryDialogComponent, PasswordDialogComponent, PieChartComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    FlexLayoutModule,
    RouterLink,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    NgOptimizedImage
  ]
})
export class UserModule {}
