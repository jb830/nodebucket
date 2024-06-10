/*
============================================
; Title:  security-routing.module.ts
; Author: Professor Krasso
; Date: 30. May, 2024
; Modified by: Joanna Brumfield
; Description: Security Routing Module
;===========================================
*/

// import statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityComponent } from './security.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  {
    path: '',
    component: SecurityComponent,
    title: 'Nodebucket: Security',
    children: [
      {
        path: 'login',
        component: SigninComponent,
        title: 'Nodebucket: Login'

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
