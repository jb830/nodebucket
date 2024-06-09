/*
============================================
; Title:  app-routing.module.ts
; Author: Professor Krasso
; Date: 30. May, 2024
; Modified by: Joanna Brumfield
; Description: App Routing Module
;===========================================
*/

// imports statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { TasksComponent } from './tasks/tasks.component';
import { SecurityComponent } from './security/security.component';
import { AuthGuard } from './shared/auth.guard'
import { SigninComponent } from './security/signin/signin.component';


// routes array with a path, component, and title for each route in the application (e.g. home, about, contact, etc.)
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'Nodebucket: Home' // title for the home page
      },
      {
        path: 'home',
        component: HomeComponent,
        title: 'Nodebucket: Home'
      },
      {
        path: 'contact', component: ContactComponent 
      },
      {
        path: 'about', component: AboutComponent 
      },
      {
        path: 'login', component: SigninComponent
      },
      {
        path: 'tasks', component: TasksComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'not-found', component: NotFoundComponent 
      },
      {
        path: '**', component: NotFoundComponent
      },
      {
        path: '**', redirectTo: 'not-found'
      },
    ]
  },
  // {
  //   path: 'security', component: SecurityComponent 
  // },
  {
    // path for the security module (e.g. login, register, forgot password, etc.)
    path: 'security',
    loadChildren: () => import('./security/security.module').then(m => m.SecurityModule)
  }
];

@NgModule({
  // imports the RouterModule and defines the routes array and other options (e.g. useHash, enableTracing, scrollPositionRestoration)
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
