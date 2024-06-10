/*
============================================
; Title:  sign-in.guard.ts
; Author: Professor Krasso
; Date: 5. June, 2024
; Modified by: Joanna Brumfield
; Description: Sign-in Auth Guard 
;===========================================
*/
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {

  const cookie = inject(CookieService);

  if (cookie.get('session_user')) {
    return true;
  } else {
    const router = inject(Router);
    router.navigate(['securety/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
};


