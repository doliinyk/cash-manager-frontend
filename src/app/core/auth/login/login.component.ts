import { Component } from '@angular/core';
import {slider} from "../../../route-animations";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    slider
  ]
})
export class LoginComponent {}
