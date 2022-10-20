import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AlertService } from '@shared/services/alert.service';
import { AuthService } from '@auth/services/auth.service';

import {
  hasLetterUpperCase,
  hasLetterLowerCase,
  hasCharSpecials,
  hasLetter,
  hasNumber,
} from '@utils/regex';

@Component({
  selector: 'app-login-auth',
  templateUrl: './login-auth.component.html',
  styleUrls: ['./login-auth.component.css'],
})
export class LoginAuthComponent implements OnInit {
  public isLoading$: Observable<boolean> = new Observable<boolean>();
  public isLoading: boolean = false;

  public form: FormGroup = new FormGroup({
    email: new FormControl('Laxederbr@gmail.com', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
      Validators.email,
    ]),
    password: new FormControl('1234567890Aa@', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(hasLetter),
      Validators.pattern(hasNumber),
      Validators.pattern(hasLetterLowerCase),
      Validators.pattern(hasLetterUpperCase),
      Validators.pattern(hasCharSpecials),
    ]),
  });

  public constructor(
    private alertService: AlertService,
    private authService: AuthService
  ) {
    this.isLoading$ = this.authService.isLoading$;
    this.isLoading$.subscribe((value) => {
      this.isLoading = value;
    });
  }

  ngOnInit(): void {}

  public submit() {
    if (this.form.invalid) return;
    this.form.disable();

    this.authService.login().subscribe({
      next: (data: any) => {
        this.alertService.success('Conta conectada com sucesso.');

        this.form.enable();
      },
      error: (err) => {
        console.error('error auth:', err);

        this.alertService.error('Erro ao fazer login. Favor tentar novamente');

        this.form.enable();
      },
    });
  }
}
