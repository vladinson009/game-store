import type {
  CategoriesCollectionResponse,
  CategoriesData,
  CreateCategoryData,
} from '../../models/categories';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { categoryEndpoints } from '../../shared/constants/apiEndpoints';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  // Category server to manage games categories wit all CRUD operations
  constructor(private http: HttpClient, private uiService: UiService) {}

  public create(inputData: CreateCategoryData): Observable<CategoriesData> {
    return this.http
      .post<CategoriesData>(categoryEndpoints.create, inputData)
      .pipe(
        tap((res) => {
          this.uiService.openSnackBar(`Category ${res.name} was created!`);
        })
      );
  }

  public getAll(): Observable<CategoriesCollectionResponse> {
    return this.http.get<CategoriesCollectionResponse>(
      categoryEndpoints.getAll + '?limit=99'
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
