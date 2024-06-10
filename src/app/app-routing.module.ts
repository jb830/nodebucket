/*
============================================
; Title:  app-routing.module.ts
; Author: Professor Krasso
; Date: 30. May, 2024
; Modified by: Joanna Brumfield
; Description: App Routing Module
;===========================================
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { TasksComponent } from './tasks/tasks.component';
import { AuthGuard } from './shared/auth.guard';

// Route paths
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      { path: '', component: HomeComponent, title: 'Nodebucket: Home' },
      { path: 'home', component: HomeComponent, title: 'Nodebucket: Home' },
      { path: 'contact', component: ContactComponent },
      { path: 'about', component: AboutComponent },
      { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
      // { path: 'not-found', component: NotFoundComponent },
      // { path: '**', redirectTo: 'not-found' }
    ]
  },
  { path: 'security', loadChildren: () => import('./security/security.module').then(m => m.SecurityModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
