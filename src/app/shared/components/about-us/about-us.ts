import { Component } from '@angular/core';
import slideAnimation from '../../../animations/slideAnimation';

@Component({
  selector: 'app-about-us',
  imports: [],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
  animations: [slideAnimation(1000, 'X')],
})
export class AboutUs {}
