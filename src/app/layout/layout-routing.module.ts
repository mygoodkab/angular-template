import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from '../landing-page/home/home.component';
const routes: Routes = [
  // {
  //   path: 'app',
  //   component: LayoutComponent,
  //   children: [
  //     // { path: 'home', loadChildren: '../landing-page/landing-page.module#LandingPageModule' },
  //     // { path: 'home', component: HomeComponent }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LayoutRoutingModule { }


