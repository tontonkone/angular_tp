import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent {
  @Input() categories: any[] = []; 
  @Output() categorySelected = new EventEmitter<string>();

  constructor() { }

  onSelectCategory(event: any) {
    const selectedCategoryId = event.target.value; // Utilisez event.target.value
    this.categorySelected.emit(selectedCategoryId);
  }
}
