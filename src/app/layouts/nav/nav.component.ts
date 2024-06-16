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
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, NavigationEnd } from '@angular/router';

export interface AppUser {
  fullName: string;
  firstName: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  menuVisible: boolean = false;
  dropdownVisible: boolean = false;
  appUser: AppUser;
  isSignedIn: boolean;
  isHomePage: boolean = false;

  //Dynamically change navigation background whether or not user is on Homepage
  ngOnInit(): void {
    this.isHomePage = this.router.url === '/' || this.router.url === '/home';
    this.router.events.subscribe((event) => {
      //triggered when the router finishes navigating to a new route
      if (event instanceof NavigationEnd) {
        this.isHomePage = this.router.url === '/' || this.router.url === '/home';

      }
    });
  }

  // Toggle menu for small screen
  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  // Dropdown toggle menu for isSignedIn
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
  constructor(private cookieService: CookieService, private router: Router) {
    // Get session user
    this.isSignedIn = this.cookieService.get('session_user') ? true : false;
    this.appUser = {} as AppUser;

    // If signed in get/set session cookies so name can dynamically be displayed in nav
    if (this.isSignedIn) {
      this.appUser = {
        fullName: this.cookieService.get('session_name'),
        firstName: this.cookieService.get('session_first_name')
      };
    }
    console.log('Signed in as', this.appUser);
    console.log('session_first_name test: ', this.appUser.firstName);
  }

  // Sign out function
  signOut() {
    console.log('Removing session user from the cookie');
    this.cookieService.deleteAll();
    window.location.href = '/';
  }
}
