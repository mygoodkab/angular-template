import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';


const AppRoutes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: LayoutComponent,
    children: [
      {
        path: '',
        // component: HomeComponent,
        loadChildren: './landing-page/landing-page.module#LandingPageModule',
      }
    ]
  },
  {
    path: 'login',
    loadChildren: './extra-pages/extra-pages.module#ExtraPagesModule'

  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
export const AppRoutingModule = RouterModule.forRoot(AppRoutes, { useHash: true });
