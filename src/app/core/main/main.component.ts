import { Component } from '@angular/core';
import {slider} from "../../route-animations";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  isAuthentificated = false;
}
