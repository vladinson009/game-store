import type {
  CategoriesCollectionResponse,
  CategoriesData,
} from '../../models/categories';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { categoryEndpoints } from '../../shared/constants/apiEndpoints';
import { UiService } from './ui.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private http: HttpClient,
    private uiService: UiService,
    private router: Router
  ) {}

  public getAll(): Observable<CategoriesCollectionResponse> {
    return this.http.get<CategoriesCollectionResponse>(
      categoryEndpoints.getAll
    );
  }
  public editCategory(
    categoryId: string,
    userInput: { name: string }
  ): Observable<CategoriesData> {
    return this.http
      .put<CategoriesData>(categoryEndpoints.edit(categoryId), userInput)
      .pipe(
        tap((res) => {
          this.uiService.openSnackBar(`Category ${res.name} was updated!`);
        })
      );
  }
  public deleteCategory(categoryId: string, name: string) {
    return this.http.delete(categoryEndpoints.delete(categoryId)).pipe(
      tap((res) => {
        this.uiService.openSnackBar(`Category ${name} was deleted!`);
      })
    );
  }
}
