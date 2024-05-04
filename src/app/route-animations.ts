import { animate, style, transition, trigger } from '@angular/animations';

export const slider = trigger('routeAnimations', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)' }),
    animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
  ]),
  transition(':leave', [animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))])
]);
