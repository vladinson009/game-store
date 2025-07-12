import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appCopyright]',
})
export class CopyrightDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    const message = `Copyright ©${currentYear} All Rights Reserved By Vladimir Gulev`;

    this.renderer.addClass(this.el.nativeElement, 'copyright');
    this.renderer.setProperty(this.el.nativeElement, 'textContent', message);
  }
}
