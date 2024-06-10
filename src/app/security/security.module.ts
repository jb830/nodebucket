/*
============================================
; Title:  security-routing.module.ts
; Author: Professor Krasso
; Date: 30. May, 2024
; Modified by: Joanna Brumfield
; Description: Security Routing Module
;===========================================
*/

// imports statements
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { SecurityRoutingModule } from './security-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SecurityComponent } from './security.component';

@NgModule({
  declarations: [
    SecurityComponent,
    SigninComponent,
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule,
    RouterModule,
    HttpClientModule,
    
  ],
  providers: [

  ],
})
export class SecurityModule { }

