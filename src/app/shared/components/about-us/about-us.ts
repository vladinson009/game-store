import { Component, OnInit, signal } from '@angular/core';
import slideAnimation from '../../../animations/slideAnimation';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-about-us',
  imports: [],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
  animations: [slideAnimation(1000, 'X')],
})
export class AboutUs implements OnInit {
  googleMapUrl = signal<SafeResourceUrl | null>(null);
  location = signal<string | null>(null);

  constructor(private sanitizer: DomSanitizer) {
    this.googleMapUrl.set(
      this.getSafeUrl(
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.5820491488394!2d2.951685382882635!3d36.73259781022446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128faf13306c1111%3A0x7a3e5400474c82e2!2sGame%20store%20ouled%20fayet!5e0!3m2!1sbg!2sbg!4v1753910931400!5m2!1sbg!2sbg'
      )
    );
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          this.location.set(`Latitude: ${lat}, Longtitude ${lng}`);
        },
        (error) => {
          console.error('Geolocation error:', error);
          this.location.set('Unable to retrieve location.');
        }
      );
    } else {
      this.location.set('Geolocation is not supported by this browser.');
    }
  }
}
