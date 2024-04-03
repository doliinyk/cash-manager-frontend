import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from "@angular/flex-layout";
import {FlexLayoutServerModule} from "@angular/flex-layout/server";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatButtonModule, MatFabButton} from "@angular/material/button";
import {MatMenuItem, MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonToggleModule} from "@angular/material/button-toggle";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFabButton,
    MatLabel,
    MatMenuItem
  ],
  exports: [
    FlexLayoutModule,
    FlexLayoutServerModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFabButton,
    MatLabel,
    MatMenuItem
  ]
})
export class MaterialModule {
}
