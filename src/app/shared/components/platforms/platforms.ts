import { Component, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import fadeLeftAnimation from '../../../animations/fadeLeftAnimation';
import { PlatformService } from '../../../core/services/platform.service';
import { PlatformData } from '../../../models/platform';
import { finalize } from 'rxjs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

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
