/*
============================================
; Title:  home.component.ts
; Author: Professor Krasso
; Date: 30. May, 2024
; Modified by: Joanna Brumfield
; Description: Home Component
;===========================================
*/
// imports statements
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export interface AppUser {
  fullName: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
  ]
})
export class HomeComponent {
  welcome: string = '';
  appUser: AppUser;
  isSignedIn: boolean;

  constructor(private cookieService: CookieService, private router: Router) {
    
    //Set session user cookies so dynamic messages can be diplayed on home screen
    this.isSignedIn = this.cookieService.get('session_user') ? true: false;
    this.appUser = {} as AppUser;

    if (this.isSignedIn) {
      this.appUser = {
        fullName: this.cookieService.get('session_name')
      }
    }
    console.log('Signed in as', this.appUser);
  }
}

