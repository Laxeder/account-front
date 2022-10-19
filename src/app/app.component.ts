import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime, Observable } from 'rxjs';
import { UserService } from './account/service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public formValid: boolean = false;
  public isLoading$: Observable<boolean> = new Observable<boolean>();
  public isLoading: boolean = false;

  public alertError: boolean = false;
  public alertSuccess: boolean = false;
  public alertErrorMessage: string = '';

  public form = new FormGroup({
    user: new FormGroup({}),
    address: new FormGroup({}),
    account: new FormGroup({}),
  });

  public updateUser(
    userForm: FormGroup = new FormGroup({}),
    form: FormGroup = new FormGroup({})
  ) {
    form.setControl('user', userForm);
  }

  public updateAddress(
    addressForm: FormGroup = new FormGroup({}),
    form: FormGroup = new FormGroup({})
  ) {
    form.setControl('address', addressForm);
  }

  public updateAccount(
    accountForm: FormGroup = new FormGroup({}),
    form: FormGroup = new FormGroup({})
  ) {
    form.setControl('account', accountForm);
  }

  public constructor(private userService: UserService) {
    this.isLoading$ = this.userService.isLoading$;
    this.isLoading$.subscribe((value) => {
      this.isLoading = value;
    });
  }

  ngOnInit() {
    console.log("form:", this.form);

    this.form.valueChanges.pipe(debounceTime(200)).subscribe((value) => {
      console.log("form:", this.form);
    });
  }

  closeAlertError() {
    this.alertError = false;
    this.alertErrorMessage = '';
  }

  closeAlertSuccess() {
    this.alertSuccess = false;
  }

  submit() {
    if (this.form.valid) {
      const account: any = this.form.controls.account.value;
      const address: any = this.form.controls.address.value;
      const user: any = this.form.controls.user.value;

      const body = {
        rg: account.rg,
        cpf: account.cpf,
        email: user.email,
        phone: user.phone,
        city: address.city,
        state: address.state,
        number: address.number,
        street: address.street,
        password: user.password,
        last_name: user.lastName,
        zipcode: address.zipcode,
        picture: account.picture,
        company: account.company,
        nickname: account.nickname,
        first_name: user.firstName,
        birthdate: account.birthdate,
        complement: address.complement || '',
        profession: account.profession,
        description: account.description,
        neighborhood: address.neighborhood,
        confirm_password: user.confirmPassword,
      };

      this.userService.save(body).subscribe({
        next: (data) => {
          this.alertSuccess = true;
        },
        error: (err) => {
          this.alertErrorMessage = err.error.message;
          this.alertError = true;
        },
      });
    }
  }

  handleDisable(): boolean {
    if (
      !this.form.controls.account.touched ||
      this.form.controls.account.invalid
    )
      return true;
    if (!this.form.controls.user.touched || this.form.controls.user.invalid)
      return true;
    if (
      !this.form.controls.address.touched ||
      this.form.controls.address.invalid
    )
      return true;

    if (this.form.touched && this.form.valid) return false;

    if (!this.isLoading) return false;

    return true;
  }
}
