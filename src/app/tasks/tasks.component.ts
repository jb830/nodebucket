/*
============================================
; Title:  tasks.component.ts
; Author: Professor Krasso
; Date: 30. May, 2024
; Modified by: Joanna Brumfield
; Description: Tasks Component
;===========================================
*/
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

export interface item {
  _id: string;
  text: string;
}

export interface Employee {
  emptId: number;
  todo: item[];
  done: item[]; 
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {

  empId: number;
  employee: Employee;
  todo: item[];
  done: item[];


  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.empId = parseInt(this.cookieService.get('session_user'), 10);
    this.employee = {} as Employee;
    this.todo = [];
    this.done = [];

    this.http.get(`/api/employees/${this.empId}/tasks`).subscribe({
      next: (emp:any) => {
        this.employee = emp;
      },
      error: () => {
        console.error("Unable to get employee data for employee ID", this.empId)
      },
      complete: () => {
        this.todo = this.employee.todo || [];
        this.done = this.employee.done || [];
      }
    })
  }

  createTask(form: NgForm) {
    if (form.valid) {
      const todoTask = form.value.task;
  
      this.http.post(`/api/employees/${this.empId}/tasks`, {
        text: todoTask
      }).subscribe({
        next: (result: any) => {
          const newToDoItem = {
            _id: result._id,
            text: todoTask 
          }
          this.todo.push(newToDoItem);
        },
        error: (err: any) => {
          console.error('Unable to create task for employee:', err);
        }
      });
    }
  }
  
}
