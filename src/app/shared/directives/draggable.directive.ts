import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { takeUntil, fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[draggable]',
})
export class DraggableDirective implements OnInit, OnDestroy {
  private element: HTMLElement;
  private parent: HTMLElement;
  private nextSibling: HTMLElement;

  private subscriptions: Subscription[] = [];

  private hasParent: any;
  private box: HTMLElement;

  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: any
  ) {
    this.element = this.elementRef.nativeElement as HTMLElement;
    this.parent = this.element.parentElement as HTMLElement;
    this.nextSibling = this.element.nextElementSibling as HTMLElement;

    this.hasParent = this.elementRef.nativeElement.hasAttribute('drag-parent');
    this.box = this.hasParent ? this.parent : this.element;

    this.initDrag();
  }

  ngOnInit(): void {
    this.element = this.elementRef.nativeElement as HTMLElement;
    this.parent = this.elementRef.nativeElement.parentElement as HTMLElement;
    this.hasParent = this.elementRef.nativeElement.hasAttribute('drag-parent');
    this.box = this.hasParent ? this.parent : this.element;
    this.initDrag();
  }

  initDrag(): void {
    const dragStart$ = fromEvent<MouseEvent>(this.element, 'mousedown');
    const dragEnd$ = fromEvent<MouseEvent>(this.document, 'mouseup');
    const drag$ = fromEvent<MouseEvent>(this.document, 'mousemove').pipe(
      takeUntil(dragEnd$)
    );

    let initialX: number,
      initialY: number,
      currentX = 0,
      currentY = 0;

    let dragSub: Subscription;

    const dragStartSub = dragStart$.subscribe((event: MouseEvent) => {
      initialX = event.clientX - currentX;
      initialY = event.clientY - currentY;

      this.box.classList.add('free-dragging');

      dragSub = drag$.subscribe((event: MouseEvent) => {
        event.preventDefault();

        currentX = event.clientX - initialX;
        currentY = event.clientY - initialY;

        this.box.style.transform =
          'translate3d(' + currentX + 'px, ' + currentY + 'px, 0)';
      });
    });

    const dragEndSub = dragEnd$.subscribe(() => {
      initialX = currentX;
      initialY = currentY;

      this.box.classList.remove('free-dragging');

      if (dragSub) {
        dragSub.unsubscribe();
      }
    });

    this.subscriptions.push.apply(this.subscriptions, [
      dragStartSub,
      dragEndSub,
    ]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s?.unsubscribe());
  }
}
