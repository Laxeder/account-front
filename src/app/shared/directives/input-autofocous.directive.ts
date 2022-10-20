import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[autofocus]',
})
export class InputAutofocus implements AfterViewInit {
  private control: HTMLElement;

  constructor(private el: ElementRef) {
    this.control = el.nativeElement;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.control.focus();
    }, 1);
  }
}
