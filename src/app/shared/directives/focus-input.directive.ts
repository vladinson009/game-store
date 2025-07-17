import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFocusInput]',
})
export class FocusInput implements AfterViewInit {
  constructor(
    private el: ElementRef<HTMLInputElement>,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() =>
      this.renderer.selectRootElement(this.el.nativeElement).focus()
    );
  }
}
