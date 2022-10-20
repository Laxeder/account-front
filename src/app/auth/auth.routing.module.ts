import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '@auth/auth.guard';

import { ForgotPasswordAuthComponent } from './pages/forgot-password-auth/forgot-password-auth.component';
import { LoginAuthComponent } from '@auth/pages/login-auth/login-auth.component';
import { SigninAuthComponent } from './pages/signin-auth/signin-auth.component';
import { AuthComponent } from '@auth/auth.component';

const router: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginAuthComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'forgot',
        component: ForgotPasswordAuthComponent,
      },
      {
        path: 'signin',
        component: SigninAuthComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(router)],
})
export class AuthRoutingModule {}
