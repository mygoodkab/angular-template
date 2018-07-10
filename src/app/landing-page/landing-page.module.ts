import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { HomeComponent } from '../landing-page/home/home.component';
import { CategoryComponent } from './category/category.component';

@NgModule({
  imports: [
    CommonModule,
    LandingPageRoutingModule
  ],
  declarations: [HomeComponent, CategoryComponent]
})
export class LandingPageModule { }
