import { HttpClient } from '@angular/common/http';
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
  public getAll(): Observable<GamesCollectionResponse> {
    return this.http.get<GamesCollectionResponse>(gameEndpoints.getAll);
  }
  public getRecent(): Observable<GamesCollectionResponse> {
    return this.http.get<GamesCollectionResponse>(
      gameEndpoints.getAll + '?limit=1'
    );
  }
  public addLike(id?: string): Observable<any> {
    return this.http.get<any>(gameEndpoints.like('687bd4e678e76ec4306a3ca5'));
  }
  public pullLike(id: string): Observable<any> {
    return this.http.get<any>(gameEndpoints.unlike(id));
  }
}
