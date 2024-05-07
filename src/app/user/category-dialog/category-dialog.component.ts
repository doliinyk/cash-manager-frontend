import { Component, ElementRef, ViewChild } from '@angular/core';
import { CategoryService } from 'shared/services/user/category.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrl: './category-dialog.component.scss'
})
export class CategoryDialogComponent {
  @ViewChild('newCategoryInput') newCategoryInput!: ElementRef;
  newNameFormControl = new FormControl('', [Validators.required,  Validators.maxLength(20)]);

  pickedColor = 'black';
  categoryPicked = 0;

  onColorChanged(event: any) {
    this.pickedColor = event.target.value;
  }

  onAppendCategory() {
    this.categoryService.addCategory({
      color: this.categoryService.hexToRgbA(this.pickedColor),
      title: this.newCategoryInput.nativeElement.value
    });
  }

  constructor(protected categoryService: CategoryService) {}
}
