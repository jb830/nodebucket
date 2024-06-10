/*
============================================
; Title:  nav.component.ts
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
  firstName: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent {
  //toggle menu for small screen
  menuVisible: boolean = false;
  dropdownVisible: boolean = false;
  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
  //dropdown toggle menu for isSignIn 
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
  
  appUser: AppUser;
  isSignedIn: boolean;


  constructor(private cookieService: CookieService, private router: Router) {
    //get session user
    this.isSignedIn = this.cookieService.get('session_user') ? true: false;
    this.appUser = {} as AppUser;

    //If signed in get/set session cookies so name can dynamically be displayed in nav
    if (this.isSignedIn) {
      this.appUser = {
        fullName: this.cookieService.get('session_name'),
        firstName: this.cookieService.get('session_first_name')
      }
    }
    console.log('Signed in as', this.appUser);
    console.log('session_first_name test: ', this.appUser.firstName)
  }

  //signout function
  signOut() {
    console.log('Removing session user from the cookie');
    this.cookieService.deleteAll();
    window.location.href = '/';
  }
}
