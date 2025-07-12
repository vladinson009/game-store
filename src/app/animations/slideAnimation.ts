import { animate, style, transition, trigger } from '@angular/animations';

export default function (ms: number, direction: 'X' | 'Y') {
  return trigger('slideAnimation', [
    transition(':enter', [
      style({ transform: `translate${direction}(100%)`, opacity: 0 }),
      animate(
        `${ms}ms ease-out`,
        style({ transform: `translate${direction}(0)`, opacity: 1 })
      ),
    ]),
    transition(':leave', [
      style({ transform: `translate${direction}(0)`, opacity: 1 }),
      animate(
        `${ms}ms ease-out`,
        style({ transform: `translate${direction}(100%)`, opacity: 0 })
      ),
    ]),
  ]);
}
