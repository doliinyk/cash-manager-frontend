import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryStateModel } from 'shared/models/category';
import { CategoryExpenseService } from 'shared/services/user/category.expense.service';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrl: './category-dialog.component.scss'
})
export class CategoryDialogComponent implements OnInit, OnDestroy {
  categories: CategoryStateModel[] = [];
  @ViewChild('newCategoryInput') newCategoryInput!: ElementRef;
  newNameFormControl = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  subscription: Subscription | undefined;

  pickedColor = '#000000';
  categoryPicked = 0;

  onColorChanged(event: any) {
    this.pickedColor = event.target.value;
  }

  onAppendCategory() {
    this.categoryService.createCategory({
      title: this.newCategoryInput.nativeElement.value,
      colorCode: this.pickedColor
    });
  }

  ngOnInit() {
    this.subscription = this.categoryService.categories$.subscribe(categories => {
      this.categories = categories;
    });
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  constructor(private categoryService: CategoryExpenseService) {}
}
