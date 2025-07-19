import { Component, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import fadeLeftAnimation from '../../../animations/fadeLeftAnimation';
import { PlatformService } from '../../../core/services/platform.service';
import { PlatformData } from '../../../models/platform';

@Component({
  selector: 'app-platforms',
  imports: [MatCardModule],
  templateUrl: './platforms.html',
  styleUrl: './platforms.css',
  animations: [fadeLeftAnimation()],
})
export class Platforms implements OnInit {
  public platforms = signal<PlatformData[]>([]);

  constructor(private platformService: PlatformService) {}

  ngOnInit() {
    this.platformService.getAll().subscribe((res) => {
      this.platforms.set(res.data);
    });
  }
}
