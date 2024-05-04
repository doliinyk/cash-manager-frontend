import { Component } from '@angular/core';
import { AuthService } from 'shared/services/auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  isAuthentificated = this.authService.isAuthorized;
  constructor(private authService: AuthService) {}
}
