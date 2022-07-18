import { animate, state, style, transition, trigger } from '@angular/animations';

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


export const animationShowHidden = [
  trigger('showHidden', [
    state('hidden', style({
      opacity: 0,
      'pointer-events': 'none',
      transform: 'translateY(50px)',
      visibility: 'hidden'
    })),
    state('show', style({
      opacity: 1,
      'pointer-events': 'all',
      transform: 'translateY(0px)',
      visibility: 'visible'
    })),
    transition('hidden => show', animate('300ms ease-in')),
    transition('show => hidden', animate('300ms ease-out'))
  ])
]
