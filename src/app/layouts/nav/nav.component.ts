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
import { Component, OnInit, HostListener } from '@angular/core';
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
  //Close drop-down menu if use click ouside of it
  //HostListener decorator to listen for click events on the document or body, and then checking whether the target of the click is outside the specified element.  https://medium.com/@garcia.alberto.4.2012/listening-to-a-click-outside-a-div-in-angular-81f988c88f7f
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const targetElement = event.target as HTMLElement;
    if (this.dropdownVisible && !targetElement.closest('.logged-in-menu')) {
      this.dropdownVisible = false;
    }
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

  //If user clicks outside of dropdown menu, hide it 


  // Sign out function
  signOut() {
    console.log('Removing session user from the cookie');
    this.cookieService.deleteAll();
    window.location.href = '/';
  }
}
