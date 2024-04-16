import { AsyncPipe, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'shared/modules/material.module';
import { UserRoutingModule } from './user-routing.module';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [PaymentsComponent, ProfileComponent],
  exports: [PaymentsComponent, ProfileComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    FlexLayoutModule,
    RouterLink,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe
  ]
})
export class UserModule {}
