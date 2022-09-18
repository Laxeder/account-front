import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const router: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@home/home.module').then((m: any) => m.HomeModule),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('@account/account.module').then((m: any) => m.AccountModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('@auth/auth.module').then((m: any) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
})
export class AppRoutingModule {}
