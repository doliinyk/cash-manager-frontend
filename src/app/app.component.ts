import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth/auth.service';
import { CategoriesService } from 'shared/services/categories/categories.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.authService.getTokens();
    this.authService.isUserAuth();
    this.categoriesService.getAllCategories();
  }
}
