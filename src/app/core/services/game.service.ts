import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  GameFormat,
  GameFormatResponse,
  GamesCollectionResponse,
} from '../../models/game';
import { Observable, tap } from 'rxjs';
import { gameEndpoints } from '../../shared/constants/apiEndpoints';
import { UiService } from './ui.service';

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
  public getAll(
    page: number,
    limit: number
  ): Observable<GamesCollectionResponse> {
    const queryString = `?page=${page}&limit=${limit}`;
    return this.http.get<GamesCollectionResponse>(
      gameEndpoints.getAll + queryString
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
