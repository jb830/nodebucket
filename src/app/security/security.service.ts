/*
============================================
; Title:  sign-in.service.ts
; Author: Professor Krasso
; Date: 5. June, 2024
; Modified by: Joanna Brumfield
; Description: Sign-in Auth Service
;===========================================
*/
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient) { };

  findEmployeeById(empId: number) {
    return this.http.get('/api/employees/' + empId);
  }
}

