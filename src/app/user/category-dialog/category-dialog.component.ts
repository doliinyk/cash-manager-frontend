import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CategoriesService } from 'shared/services/categories/categories.service';
import { Categories } from 'shared/enums/categories';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrl: './category-dialog.component.scss'
})
export class CategoryDialogComponent {
  @ViewChild('newCategoryInput') newCategoryInput!: ElementRef;
  newNameFormControl = new FormControl('', [Validators.required, Validators.maxLength(20)]);

  pickedColor = '#000000';
  categoryPicked = 0;

  constructor(public categoriesService: CategoriesService) {}

  onColorChanged(event: any) {
    this.pickedColor = event.target.value;
  }

  onAppendCategory() {
    this.categoriesService.createCategory(Categories.expenses, {
      title: this.newCategoryInput.nativeElement.value,
      colorCode: this.pickedColor
    });
  }
}
