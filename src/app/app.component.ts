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

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setBodyBackground(this.router.url);
      }
    });
  }

  private setBodyBackground(url: string): void {
    if (url === '/') {
      document.body.classList.add('home-bg');
    } else {
      document.body.classList.remove('home-bg');
    }
  }
}
