import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Buffer } from 'buffer';
import { debounceTime, filter, map } from 'rxjs';
import { onlyLettersNickname, onlyNumbersRG } from 'src/utils/regex';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  @Input() update: Function = new Function();
  @Input() appForm: FormGroup = new FormGroup({});

  public pictureTouched: boolean = false;

  public form = new FormGroup({
    picture: new FormControl(null, [Validators.required]),
    birthdate: new FormControl(null, [Validators.required]),
    cpf: new FormControl(null, [Validators.required]),
    rg: new FormControl(null, [
      Validators.required,
      Validators.pattern(onlyNumbersRG),
    ]),
    nickname: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(onlyLettersNickname),
    ]),
    profession: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    company: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    description: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  constructor() {}

  ngOnInit(): void {
    this.form.valueChanges.pipe(debounceTime(200)).subscribe((value) => {
      this.update(this.form, this.appForm);
    });

    this.form
      .get('birthdate')
      ?.valueChanges.pipe(
        filter((value: any) => !!value),
        debounceTime(200),
        map((birthdate: string | null | undefined) => {
          const timestamp = Date.parse(String(birthdate));
          return <boolean>!isNaN(timestamp);
        })
      )
      .subscribe((isValid: boolean) => {
        if (!isValid) {
          this.form.get('birthdate')?.setErrors({ invalid: true });
        }

        const now = new Date(Date.now()).getFullYear();
        const birthdate = new Date(String(this.form.get('birthdate')?.value));
        const year = birthdate.getFullYear();

        if (now - year > 120) {
          this.form.get('birthdate')?.setErrors({ maxYear: true });
        }

        if (now - year < 8) {
          this.form.get('birthdate')?.setErrors({ minYear: true });
        }
      });
  }

  public onFileSelected(base64: any) {
    const [file]: any = base64;
    this.pictureTouched = true;

    if (!file) {
      this.form.get('picture')?.setErrors(Validators.required);
      return;
    }

    if (file.length > 1024) {
      this.form.get('picture')?.setErrors({ maxLength: true });
      return;
    }

    this.form.patchValue({ picture: file.data });
  }
}
