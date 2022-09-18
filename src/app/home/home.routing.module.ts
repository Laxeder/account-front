import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from '@home/pages/home/home.component';

const router: Routes = [
  {
    component: HomeComponent,
    path: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(router)],
})
export class HomeRoutingModule {}