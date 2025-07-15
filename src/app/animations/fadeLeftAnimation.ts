import { animate, style, transition, trigger } from '@angular/animations';

export default function () {
  return trigger('fadeLeftAnimation', [
    transition(':enter', [
      style({
        transform: `translateX(100%)`,
        opacity: 0,
        'box-shadow': '21px 21px 15px 30px',
      }),
      animate(
        `2600ms ease-out`,
        style({
          transform: `translateY(0)`,
          opacity: 1,
          'box-shadow': '1px 3px 15px 3px',
        })
      ),
    ]),
    transition(':leave', [
      style({ transform: `translateY(0)`, opacity: 1 }),
      animate(
        `600ms ease-out`,
        style({ transform: `translateY(100%)`, opacity: 0 })
      ),
    ]),
  ]);
}
