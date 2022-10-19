import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeRoutingModule } from '@home/home.routing.module';

import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  exports: [MainComponent, HomeComponent],
  imports: [CommonModule, HomeRoutingModule],
  declarations: [MainComponent, HomeComponent],
})
export class HomeModule {}
