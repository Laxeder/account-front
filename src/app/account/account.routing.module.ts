import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CreateComponent } from '@account/pages/create/create.component';

const router: Routes = [
  {
    component: CreateComponent,
    path: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(router)],
})
export class AccountRoutingModule {}
