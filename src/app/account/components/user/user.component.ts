import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { debounceTime, filter, map } from 'rxjs';

import {
  hasLetter,
  hasNumber,
  hasCharSpecials,
  hasLetterLowerCase,
  hasLetterUpperCase,
  hasLetterPhone,
  onlyLetters,
} from '@utils/regex';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @Input() update: Function = new Function();
  @Input() appForm: FormGroup = new FormGroup({});

  public isValid: boolean = false;
  public confirmPasswordIsValid: boolean = false;

  public form = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
      Validators.email,
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(16),
      Validators.pattern(hasLetterPhone),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(hasLetter),
      Validators.pattern(hasNumber),
      Validators.pattern(hasLetterLowerCase),
      Validators.pattern(hasLetterUpperCase),
      Validators.pattern(hasCharSpecials),
    ]),
    lastName: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.pattern(onlyLetters),
    ]),
    firstName: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.pattern(onlyLetters),
    ]),
    confirmPassword: new FormControl(null, [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {
    this.form.valueChanges.pipe(debounceTime(200)).subscribe((value) => {
      this.update(this.form, this.appForm);
    });

    this.form
      .get('confirmPassword')
      ?.valueChanges.pipe(
        filter((value: any) => !!value),
        map((confirmPassword: string | null | undefined) => {
          const password: string = this.form.get('password')?.value || '';
          return <boolean>(password === confirmPassword);
        })
      )
      .subscribe((isValid: boolean) => {
        if (!isValid) {
          this.form.get('confirmPassword')?.setErrors({ incorrect: true });
        }
      });

    this.form.valueChanges.subscribe((value: any) => {});
  }
}
