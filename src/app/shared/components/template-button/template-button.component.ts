import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

type ButtonType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

@Component({
  selector: 'app-template-button',
  templateUrl: './template-button.component.html',
  styleUrls: ['./template-button.component.css'],
})
export class TemplateButtonComponent implements OnInit {
  @Input() isTemplate: boolean = false
  @Input() type: ButtonType = 'primary';
  @Input() title: string = 'Button';

  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  public click() {
    this.onClick.emit();
  }
}
