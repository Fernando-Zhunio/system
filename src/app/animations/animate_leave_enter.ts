import { animate, style, transition, trigger } from '@angular/animations';

 export const animation_conditional = [trigger('fade', [
    transition(
      ':leave', [

      style({ transform: 'scale(1)', opacity: '1' }),
      animate(300, style({ transform: 'scale(0)', opacity: '0' }))
    ]
    ),
    transition(':enter', [
      style({ transform: 'scale(0)', opacity: '0' }),
      animate(300)
    ]),
  ])];
