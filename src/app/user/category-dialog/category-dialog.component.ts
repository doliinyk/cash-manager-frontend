import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CategoryStateModel } from 'shared/models/category';
import { CategoryService } from 'shared/services/user/category.service';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrl: './category-dialog.component.scss'
})
export class CategoryDialogComponent implements OnInit {
  categories: CategoryStateModel[] = [];
  @ViewChild('newCategoryInput') newCategoryInput!: ElementRef;
  newNameFormControl = new FormControl('', [Validators.required, Validators.maxLength(20)]);

  pickedColor = 'black';
  categoryPicked = 0;

  onColorChanged(event: any) {
    this.pickedColor = event.target.value;
  }

  onAppendCategory() {
    console.log(this.newCategoryInput.nativeElement.value);
    this.categoryService.createCategory({ color: this.pickedColor, title: this.newCategoryInput.nativeElement.value });
  }

  ngOnInit() {
    const categoriesObs = this.categoryService.getCategories();
    categoriesObs.subscribe(category => {
      for (const key in category) {
        this.categories.push({ color: this.categoryService.hexToRgbA(key), title: category[key].title });
      }
      console.log(this.categories.map(category => category.title || 'Nihuya'));
    });
  }

  constructor(protected categoryService: CategoryService) {}
}
