import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { categoryEndpoints } from '../../shared/constants/apiEndpoints';
import { CategoriesCollectionResponse } from '../../models/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<CategoriesCollectionResponse> {
    return this.http.get<CategoriesCollectionResponse>(
      categoryEndpoints.getAll
    );
  }
}
