import type {
  CreatePlatformData,
  PlatformData,
  PlatformsCollectionResponse,
} from '../../models/platform';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { platformEndpoints } from '../../shared/constants/apiEndpoints';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  // Platform server to manage games platforms wit all CRUD operations

  constructor(private http: HttpClient, private uiService: UiService) {}

  public create(inputData: CreatePlatformData): Observable<PlatformData> {
    return this.http
      .post<PlatformData>(platformEndpoints.create, inputData)
      .pipe(
        tap((res) => {
          this.uiService.openSnackBar(`Platform ${res.name} was created!`);
        })
      );
  }

  public getAll(): Observable<PlatformsCollectionResponse> {
    return this.http.get<PlatformsCollectionResponse>(
      platformEndpoints.getAll + '?limit=99'
    );
  }
  public editPlatform(
    platformId: string,
    userInput: { name: string }
  ): Observable<PlatformData> {
    return this.http
      .put<PlatformData>(platformEndpoints.edit(platformId), userInput)
      .pipe(
        tap((res) => {
          this.uiService.openSnackBar(`Platform ${res.name} was updated`);
        })
      );
  }
  public deletePlatform(platformId: string, name: string) {
    return this.http.delete(platformEndpoints.delete(platformId)).pipe(
      tap((res) => {
        this.uiService.openSnackBar(`Platform ${name} was deleted!`);
      })
    );
  }
}
