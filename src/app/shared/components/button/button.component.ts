import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

type ButtonType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

type SpinnerType = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input() isLoading: Observable<boolean> = new Observable<boolean>();
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() onClasses: string = '';
  @Input() onStyles: any = <any>{};
  @Input() size: SpinnerType = 'sm';
  @Input() type: ButtonType = 'primary';
  @Input() message: string = 'Aguarde...';

  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() onBlur: EventEmitter<void> = new EventEmitter<void>();
  @Output() onFocus: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  public click() {
    this.onClick.emit();
  }

  public blur() {
    this.onBlur.emit();
  }

  public focus() {
    this.onFocus.emit();
  }
}
