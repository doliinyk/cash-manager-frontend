import { Component, ElementRef, ViewChild } from '@angular/core';
import { CategoryStateModel } from 'shared/models/category';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrl: './category-dialog.component.scss'
})
export class CategoryDialogComponent {
  @ViewChild('newCategoryInput') newCategoryInput!: ElementRef;

  pickedColor = 'black';
  categoryPicked = 0;

  categories: CategoryStateModel[] = [
    // Треба витащити трати і об'єднати з тим масивом
    // Для тесту, оскільки не єбу де зараз брати категорії
    { id: 0, color: 'green', title: 'green' },
    { id: 1, color: 'red', title: 'red' },
    { id: 2, color: 'blue', title: 'blue' },
    { id: 3, color: 'yellow', title: 'yellow' },
    { id: 4, color: 'orange', title: 'orange' },
    { id: 5, color: 'gray', title: 'gray' },
    { id: 6, color: 'violet', title: 'violet' }
  ];

  onColorChanged(event: any) {
    this.pickedColor = event.target.value;
  }

  onAppendCategory() {
    this.categories.push({
      id: this.categories.length,
      color: this.pickedColor,
      title: this.newCategoryInput.nativeElement.value
    });
  }
}
