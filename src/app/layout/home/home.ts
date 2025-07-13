import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import carouselAnimation from '../../animations/carouselAnimation';
import slideAnimation from '../../animations/slideAnimation';
import { RouterLink } from '@angular/router';
import { Platforms } from '../../shared/components/platforms/platforms';

export interface HomeType {
  name: string;
  message: string;
  imageUrl?: string;
  role?: string;
}
@Component({
  selector: 'app-home',
  imports: [MatButtonModule, CommonModule, RouterLink, Platforms],
  templateUrl: './home.html',
  styleUrl: './home.css',
  animations: [carouselAnimation(800), slideAnimation(800, 'Y')],
})
export class Home implements OnInit, OnDestroy {
  private intervalId: null | number = null;
  public activeIndex = 0;

  constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.testimonials.length;
      this.cdr.markForCheck();
    }, 10000);
  }
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  public testimonials = [
    {
      name: 'Counter Strike',
      message: 'This is an amazing game',
      imageUrl:
        'https://images.unsplash.com/flagged/photo-1560177776-295b9cd779de?q=80&w=1004&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      role: 'Pet-Owner',
    },
    {
      name: 'John Smith',
      message: 'Very professional and caring staff. Highly recommend!',
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1718652842683-8e7f623fbc1b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fGJveGVyJTIwZG9nJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D',
      role: 'Dog-Trainer',
    },
    {
      name: 'Jane Doe',
      message:
        ' This pet shop cha c ch lent service! This pet shop changed my life. Excellellent service! This pet shop changed my life. Excellellent service! This pet shop changed my life. Excellellent service! This pet shop changed my life. Excellellent service! This pet sho life. Excellellent service! This pet sho life. Excellellent service! This pet sho life. Excellellent service! This petnt service! This petnt service! This petnt service! This petnt service! This petnt service! This petnt service! This petnt service! This petnt service! This petnt service! This pet sho life. Excellellent service! This pet shop changed my life. Excellent service! This pet shop changed my life. Excellent service! This pet shop changed my life. Excellent service! This pet shop changed my life. Excellent service! This pet shop changed my life. Excellent service! This pet shop changed my life. Excellent service! This pet shop changed my life. Excellent service! This pet shop changed my life. Excellent service! This pet shop changed my life. Excellent service! This pet shop changed my life. Excellent service!',
      imageUrl:
        'https://images.unsplash.com/photo-1599460093135-f881f382fc26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGJveGVyJTIwZG9nJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D',
      role: 'Pet Owner',
    },
    {
      name: 'John Smith',
      message: 'Very professional and caring staff. Highly recommend!',
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1718652842683-8e7f623fbc1b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fGJveGVyJTIwZG9nJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D',
      role: 'Dog Trainer',
    },
  ];

  public next() {
    this.activeIndex = (this.activeIndex + 1) % this.testimonials.length;
  }
  public prev() {
    this.activeIndex =
      (this.activeIndex - 1 + this.testimonials.length) %
      this.testimonials.length;
  }
  public setActive(index: number) {
    this.activeIndex = index;
  }
}
