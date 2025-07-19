import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GameFormat, GameFormatResponse } from '../../models/game';
import { Observable, tap } from 'rxjs';
import {
  gameEndpoints,
  platformEndpoints,
} from '../../shared/constants/apiEndpoints';
import { UiService } from './ui.service';
import {
  PlatformFormat,
  PlatformFormatResponse,
  PlatformsCollectionResponse,
} from '../../models/platform';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<PlatformsCollectionResponse> {
    return this.http.get<PlatformsCollectionResponse>(platformEndpoints.getAll);
  }
}
