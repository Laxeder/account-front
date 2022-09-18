import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing.module';

import { AccountModule } from '@account/account.module';
import { HomeModule } from '@home/home.module';
import { AuthModule } from '@auth/auth.module';

import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AccountModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    AuthModule,
    HomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [HeaderComponent, FooterComponent],
})
export class AppModule {}
