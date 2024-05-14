import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CategoryService } from 'shared/services/user/category.service';
import { FormControl, Validators } from '@angular/forms';
import {CategoryStateModel} from "shared/models/category";

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrl: './category-dialog.component.scss'
})
export class CategoryDialogComponent implements OnInit {
  categories?: CategoryStateModel[];
  @ViewChild('newCategoryInput') newCategoryInput!: ElementRef;
  newNameFormControl = new FormControl('', [Validators.required, Validators.maxLength(20)]);

  pickedColor = 'black';
  categoryPicked = 0;

  onColorChanged(event: any) {
    this.pickedColor = event.target.value;
  }

  onAppendCategory() {}

  ngOnInit() {
   // this.categories = this.categoryService.getCategories();
  }

  constructor(protected categoryService: CategoryService) {}
}
