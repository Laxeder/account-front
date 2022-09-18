import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthRoutingModule } from '@auth/auth.routing.module';
import { AuthComponent } from './auth.component';
import { AuthGuard } from '@auth/auth.guard';

import { ForgotPasswordAuthComponent } from '@auth/pages/forgot-password-auth/forgot-password-auth.component';
import { SigninAuthComponent } from '@auth/pages/signin-auth/signin-auth.component';
import { LoginAuthComponent } from '@auth/pages/login-auth/login-auth.component';

@NgModule({
  declarations: [
    ForgotPasswordAuthComponent,
    SigninAuthComponent,
    LoginAuthComponent,
    AuthComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, RouterModule],
  exports: [
    ForgotPasswordAuthComponent,
    SigninAuthComponent,
    LoginAuthComponent,
    AuthComponent,
  ],
  providers: [AuthGuard],
})
export class AuthModule {}
