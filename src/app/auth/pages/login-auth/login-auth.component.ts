import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AccountService } from '@shared/services/account.service';
import { AlertService } from '@shared/services/alert.service';
import { AuthService } from '@auth/services/auth.service';
import { Storage } from '@utils/storage';

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

  private storage: Storage = new Storage();

  public form: FormGroup = new FormGroup({
    email: new FormControl('fakeLucas@gmail.com', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
      Validators.email,
    ]),
    password: new FormControl('Alterar@123', [
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
    private accountService: AccountService,
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router
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

    this.authService
      .login({
        email: this.form.value.email,
        password: this.form.value.password,
      })
      .subscribe({
        next: (data: any) => {
          this.alertService.success('Conta conectada com sucesso.');

          this.setUserPicture(this.storage.getItem('user'));

          this.form.enable();
        },
        error: (err) => {
          console.error('error auth:', err.stack);

          this.alertService.error(
            'Erro ao fazer login. Favor tentar novamente'
          );

          this.form.enable();
        },
      });
  }

  private setUserPicture(user: any) {
    this.accountService.listAccount(user.email).subscribe({
      next: (data: any) => {
        user.picture = data.picture;
        this.storage.setItem('user', user);
      },
      error: () => {
        this.alertService.error('Erro ao carregar dados do usuário');
      },
    });
  }
}
