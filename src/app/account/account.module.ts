import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccountRoutingModule } from '@account/account.routing.module';

import { AddressComponent } from '@account/components/address/address.component';
import { AccountComponent } from '@account/components/account/account.component';
import { CreateComponent } from '@account/pages/create/create.component';
import { UserComponent } from '@account/components/user/user.component';

@NgModule({
  exports: [AddressComponent, AccountComponent, CreateComponent, UserComponent],
  imports: [
    AccountRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    FormsModule,
  ],
  declarations: [
    AddressComponent,
    AccountComponent,
    CreateComponent,
    UserComponent,
  ],
})
export class AccountModule {}
