/*
============================================
; Title:  app.component.ts
; Author: Professor Krasso
; Date: 30. May, 2024
; Modified by: Joanna Brumfield
; Description: App Component
;===========================================
*/
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  //once navigation ends set the background image with setBodyBackground function  
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setBodyBackground(this.router.url);
      }
    });
    this.setBodyBackground(this.router.url);
  }

  //Change background image based on URL, neccesary for make it stretch outside of the navigaation area 
  private setBodyBackground(url: string): void {
    if (url === '/' && window.innerWidth > 768 ) {
      document.body.classList.add('home-bg');
    } else if (url === '/' && window.innerWidth <= 768) {
      document.body.classList.remove('home-bg');
      document.body.classList.add('mobile-bg');
    } else {
      document.body.classList.remove('home-bg');
    }
  }  
}
