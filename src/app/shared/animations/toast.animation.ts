import { trigger, transition, style, animate } from '@angular/animations';

const enterTrans = transition(':enter', [
  style({ opacity: 0, transform: 'translate(1000px, 0px)' }),
  animate(
    '1s ease-in',
    style({ opacity: 1, transform: 'translate(0px, 0px)' })
  ),
]);

const leaveTrans = transition(':leave', [
  style({ opacity: 1 }),
  animate(
    '300ms ease-out',
    style({ opacity: 0, transform: 'translate(0px, -300px)' })
  ),
]);

/**
 * Anima cada item da lista para que cada item seja adicionado um por vez
 */
export const ToastDelayAnimation = trigger('ToastDelayAnimation', [
  enterTrans,
  leaveTrans,
]);
