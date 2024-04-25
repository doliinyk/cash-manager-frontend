import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {UserIsAuth} from "shared/store/app/app.actions";
import {AuthService} from "shared/services/auth/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent  {
  isAuthentificated = this.authService.isAuthorized;
  constructor(
              private authService: AuthService) {
  }
}
