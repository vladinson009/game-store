import { animate, style, transition, trigger } from '@angular/animations';

export default function (ms: number) {
  return trigger('carouselAnimation', [
    transition(':increment', [
      style({ transform: 'translateX(100%)', opacity: 0 }),
      animate(
        `${ms}ms ease-out`,
        style({ transform: 'translateX(0)', opacity: 1 })
      ),
    ]),
    transition(':decrement', [
      style({ transform: 'translateX(-100%)', opacity: 0 }),
      animate(
        `${ms}ms ease-out`,
        style({ transform: 'translateX(0)', opacity: 1 })
      ),
    ]),
  ]);
}
