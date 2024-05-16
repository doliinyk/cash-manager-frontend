import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { BarChartComponent } from 'shared/components/bar-chart/bar-chart.component';
import { PieChartComponent } from 'shared/components/pie-chart/pie-chart.component';
import { MaterialModule } from 'shared/modules/material.module';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileComponent } from './profile/profile.component';
import { UserRoutingModule } from './user-routing.module';
import {NgxsModule} from "@ngxs/store";
import {CategoryState} from "shared/store/category/category.state";

@NgModule({
  declarations: [
    PaymentsComponent,
    ProfileComponent,
    CategoryDialogComponent,
    PasswordDialogComponent,
    PieChartComponent,
    BarChartComponent
  ],
  exports: [
    PaymentsComponent,
    ProfileComponent,
    CategoryDialogComponent,
    PasswordDialogComponent,
    PieChartComponent,
    BarChartComponent
  ],
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
