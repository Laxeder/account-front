import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs';

import { onlyLetters, onlyNumbers } from '@utils/regex';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  @Input() update: Function = new Function();
  @Input() appForm: FormGroup = new FormGroup({});

  public form = new FormGroup({
    number: new FormControl(null, [
      Validators.required,
      Validators.minLength(1),
    ]),
    street: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    neighborhood: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(onlyLetters),
    ]),
    city: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(onlyLetters),
    ]),
    state: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(onlyLetters),
    ]),
    zipcode: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(onlyNumbers),
    ]),
    complement: new FormControl(null, []),
  });

  constructor() {}

  ngOnInit(): void {
    this.form.valueChanges.pipe(debounceTime(200)).subscribe((value) => {
      this.update(this.form, this.appForm);
    });
  }
}
