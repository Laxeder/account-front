import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { UserService } from '@account/service/user.service';
import { AlertService } from '@shared/services/alert.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  public isLoading$: Observable<boolean> = new Observable<boolean>();
  public formValid: boolean = false;
  public isLoading: boolean = false;

  public form = new FormGroup({
    address: new FormGroup({}),
    account: new FormGroup({}),
    user: new FormGroup({}),
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

  public constructor(
    private userService: UserService,
    private alertService: AlertService
  ) {
    this.isLoading$ = this.userService.isLoading$;
    this.isLoading$.subscribe((value) => {
      this.isLoading = value;
    });
  }

  ngOnInit() {}

  submit() {
    if (this.form.valid) {
      const account: any = this.form.controls.account.value;
      const address: any = this.form.controls.address.value;
      const user: any = this.form.controls.user.value;

      const body = {
        complement: address.complement as string,
        confirm_password: user.confirmPassword,
        neighborhood: address.neighborhood,
        description: account.description,
        profession: account.profession,
        birthdate: account.birthdate,
        first_name: user.firstName,
        nickname: account.nickname,
        company: account.company,
        last_name: user.lastName,
        zipcode: address.zipcode,
        picture: account.picture,
        password: user.password,
        street: address.street,
        number: address.number,
        state: address.state,
        city: address.city,
        phone: user.phone,
        email: user.email,
        cpf: account.cpf,
        rg: account.rg,
      };

      this.userService.save(body).subscribe({
        next: (data) => {
          this.alertService.success('Conta cadastrada com sucesso.');
        },
        error: (err) => {
          this.alertService.error(err);
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
