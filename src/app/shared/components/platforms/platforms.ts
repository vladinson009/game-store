import type { PlatformData } from '../../../models/platform';

import { Component, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs';

// ? Material
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import fadeLeftAnimation from '../../../animations/fadeLeftAnimation';
import { PlatformService } from '../../../core/services/platform.service';
@Component({
  selector: 'app-platforms',
  imports: [MatCardModule, MatProgressSpinner],
  templateUrl: './platforms.html',
  styleUrl: './platforms.css',
  animations: [fadeLeftAnimation()],
})
export class Platforms implements OnInit {
  public platforms = signal<PlatformData[]>([]);
  public isLoading = signal<boolean>(true);
  constructor(private platformService: PlatformService) {}

  ngOnInit() {
    this.platformService
      .getAll()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe((res) => {
        this.platforms.set(res.data);
      });
  }
}
