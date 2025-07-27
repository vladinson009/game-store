import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  GameCollectionSingleResponse,
  GameFormat,
  GameFormatResponse,
  GamesCollectionResponse,
} from '../../models/game';
import { Observable, tap } from 'rxjs';
import { gameEndpoints } from '../../shared/constants/apiEndpoints';
import { UiService } from './ui.service';
import { QueryParams } from '../../models/queryParams';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private uiService: UiService
  ) {}

  public uploadImage(formData: FormData) {
    return this.http.post<any>(gameEndpoints.uploadFileUrl, formData);
  }
  public createGame(userInput: GameFormat): Observable<GameFormatResponse> {
    return this.http
      .post<GameFormatResponse>(gameEndpoints.create, userInput)
      .pipe(
        tap((res) => {
          this.uiService.openSnackBar(`Game ${res.title} created!`);
          this.router.navigate(['/games']);
        })
      );
  }
  public editGame(
    gameId: string,
    userInput: GameFormat
  ): Observable<GameFormatResponse> {
    return this.http
      .put<GameFormatResponse>(gameEndpoints.edit(gameId), userInput)
      .pipe(
        tap((res) => {
          this.uiService.openSnackBar(`Game ${res.title} updated`);
          this.router.navigate(['/games']);
        })
      );
  }
  public getById(gameId: string): Observable<GameCollectionSingleResponse> {
    return this.http.get<GameCollectionSingleResponse>(
      gameEndpoints.getById(gameId)
    );
  }
  public getAll(params: QueryParams): Observable<GamesCollectionResponse> {
    // const queryString = `?page=${page}&limit=${limit}`;
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, value);
      }
    });
    return this.http.get<GamesCollectionResponse>(gameEndpoints.getAll, {
      params: httpParams,
    });
  }
  public deleteById(gameId: string): Observable<GameCollectionSingleResponse> {
    return this.http.delete<GameCollectionSingleResponse>(
      gameEndpoints.delete(gameId)
    );
  }
  public getRecent(): Observable<GamesCollectionResponse> {
    return this.http.get<GamesCollectionResponse>(
      gameEndpoints.getAll + '?limit=1'
    );
  }
  public addLike(id: string): Observable<any> {
    return this.http.get<any>(gameEndpoints.like(id));
  }
  public pullLike(id: string): Observable<any> {
    return this.http.get<any>(gameEndpoints.unlike(id));
  }
}
