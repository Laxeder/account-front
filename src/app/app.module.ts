import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { AddressComponent } from './address/address.component';
import { AccountComponent } from './account/account.component';
import { InputFileDirective } from './directives/input-file.directive';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AddressComponent,
    AccountComponent,
    InputFileDirective,
  ],
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [UserComponent, AddressComponent, AccountComponent],
})
export class AppModule {}
