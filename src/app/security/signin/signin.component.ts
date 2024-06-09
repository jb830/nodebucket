/*
============================================
; Title:  login.component.ts
; Author: Professor Krasso
; Date: 30. May, 2024
; Modified by: Joanna Brumfield
; Description: Login Component
;===========================================
*/
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, Validators } from '@angular/forms';
import { SecurityService } from '../security.service';

export interface SessionUser {
  empId: number;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  errMessage: string = '';
  sessionUser: SessionUser;
  isLoading: boolean = false;

  signinForm = this.fb.group({ 
    empId: [null, Validators.compose([
      Validators.required, 
      Validators.pattern('^[0-9]*$')]
    )]
  });
  
  constructor(
    private fb: FormBuilder, 
    private cookieService: CookieService, 
    private router: Router, 
    private securityService: SecurityService, 
    private route: ActivatedRoute
  ) {
    this.errMessage = "";
    this.sessionUser = {} as SessionUser;
  }

  signin() {
    this.isLoading = true;

    const empId = this.signinForm.controls['empId'].value;

    if (!empId || isNaN(parseInt(empId, 10))) {
      this.errMessage = 'The employee ID you entered is invalid, please try again';
      this.isLoading = false;
      return;
    }

    this.securityService.findEmployeeById(empId).subscribe({
      next: (employee: any) => {
        this.sessionUser = employee;
        this.cookieService.set('session_user', empId, 1);
        this.cookieService.set('session_name', `${employee.firstName} ${employee.lastName}`, 1);

        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';

        this.isLoading = false;
        this.router.navigate([returnUrl]);
      },
      error: (err) => {
        this.isLoading = false;
        
        if (err.error.message) {
          this.errMessage = err.error.message || err.message;
          return;
        }
        this.errMessage = err.message;
      }
    });
  }
}
