import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtraPagesRoutingModule } from './extra-pages-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    ExtraPagesRoutingModule
  ],
  declarations: [LoginComponent]
})
export class ExtraPagesModule { }
