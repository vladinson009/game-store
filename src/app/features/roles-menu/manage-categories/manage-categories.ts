import type { CategoriesData } from '../../../models/categories';

import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

// ? Material
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { CategoryService } from '../../../core/services/category.service';
import slideAnimation from '../../../animations/slideAnimation';

@Component({
  selector: 'app-manage-categories',
  imports: [
    MatFormFieldModule,
    MatTableModule,
    MatInput,
    FormsModule,
    MatButton,
    ReactiveFormsModule,
  ],
  templateUrl: './manage-categories.html',
  styleUrl: './manage-categories.css',
  animations: [slideAnimation(1000, 'Y')],
})
export class ManageCategories implements OnInit {
  displayedColumns = ['_id', 'author', 'name', 'actions'];
  categories = signal<CategoriesData[] | undefined>(undefined);
  inputControl: { [id: string]: FormControl } = {};

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((res) => {
      this.categories.set(res.data);
      this.categories()?.forEach((el) => {
        this.inputControl[el._id] = new FormControl('');
      });
    });
  }
  updateCategory(categoryId: string) {
    const inputField = this.inputControl[categoryId];
    this.categoryService
      .editCategory(categoryId, { name: inputField.value })
      .subscribe((res) => {
        this.categories.update((prevValue) => {
          const newValue = prevValue?.slice();
          const item = newValue?.find((el) => el._id === categoryId);
          if (item) {
            item.name = inputField.value;
          }
          inputField.reset();
          return newValue;
        });
      });
  }
  deleteCategory(categoryId: string, categoryName: string) {
    this.categoryService
      .deleteCategory(categoryId, categoryName)
      .subscribe((res) => {
        this.categories.update((prevValue) =>
          prevValue?.filter((el) => el._id !== categoryId)
        );
      });
  }
}
