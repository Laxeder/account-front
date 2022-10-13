import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() footer: string = '';
  @Input() title: string = '';
  @Input() body: string = '';

  constructor() {}

  ngOnInit(): void {}
}
