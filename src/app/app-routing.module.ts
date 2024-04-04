import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MainComponent } from './core/main/main.component';

@NgModule({
  imports: [RouterModule.forRoot([{ path: '', component: MainComponent }])],
  exports: [RouterModule]
})
export class AppRoutingModule {}
