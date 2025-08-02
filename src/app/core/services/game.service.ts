import type {
  GameCollectionSingleResponse,
  GameFormat,
  GameFormatResponse,
  GamesCollectionResponse,
} from '../../models/game';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { gameEndpoints } from '../../shared/constants/apiEndpoints';
import { UiService } from './ui.service';
import { QueryParams } from '../../models/queryParams';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public totalGames$ = new BehaviorSubject(0);

  constructor(
    private http: HttpClient,
    private router: Router,
    private uiService: UiService
  ) {}

  // Upload image request
  public uploadImage(formData: FormData) {
    return this.http.post<any>(gameEndpoints.uploadFileUrl, formData);
  }

  // Create new game
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
  // Edit game by gameId
  public editGame(
    gameId: string,
    userInput: GameFormat
  ): Observable<GameFormatResponse> {
    return this.http
      .put<GameFormatResponse>(gameEndpoints.edit(gameId), userInput)
      .pipe(
        tap((res) => {
          this.uiService.openSnackBar(`Game ${res.title} updated`);
          this.router.navigate(['/games', 'details', gameId]);
        })
      );
  }
  // Get single data
  public getById(gameId: string): Observable<GameCollectionSingleResponse> {
    return this.http.get<GameCollectionSingleResponse>(
      gameEndpoints.getById(gameId)
    );
  }
  // Get all games in the store using pagination
  public getAll(params: QueryParams): Observable<GamesCollectionResponse> {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, value);
      }
    });
    return this.http
      .get<GamesCollectionResponse>(gameEndpoints.getAll, {
        params: httpParams,
      })
      .pipe(
        tap((res) => {
          this.totalGames$.next(res.pagination.total);
        })
      );
  }
  // Delete game by id
  public deleteById(gameId: string): Observable<GameCollectionSingleResponse> {
    return this.http.delete<GameCollectionSingleResponse>(
      gameEndpoints.delete(gameId)
    );
  }
  // Get most recent game in the store
  public getRecent(): Observable<GamesCollectionResponse> {
    return this.http
      .get<GamesCollectionResponse>(gameEndpoints.getAll + '?limit=1')
      .pipe(tap((res) => this.totalGames$.next(res.pagination.total)));
  }

  // Like & Unlke methods
  public addLike(id: string): Observable<any> {
    return this.http.get<any>(gameEndpoints.like(id));
  }
  public pullLike(id: string): Observable<any> {
    return this.http.get<any>(gameEndpoints.unlike(id));
  }
}
