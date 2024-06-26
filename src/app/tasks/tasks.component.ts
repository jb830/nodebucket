/*
============================================
; Title:  tasks.component.ts
; Author: Professor Krasso
; Date: 30. May, 2024
; Modified by: Joanna Brumfield
; Description: Tasks Component
;===========================================
*/
import { Component, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

export interface item {
  _id: string;
  text: string;
}

export interface Employee {
  empId: number;
  todo: item[];
  doing: item[],
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
  doing: item[];
  done: item[];
  taskId: string;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    // get employee ID from cookies
    this.empId = parseInt(this.cookieService.get('session_user'), 10);
    //initialize variables 
    this.employee = {} as Employee;
    this.todo = [];
    this.doing = [];
    this.done = [];
    this.taskId = this.cookieService.get('session_user');

    // show list of tasks for employee 
    // call API to get tasks 
    this.http.get(`/api/employees/${this.empId}/tasks`).subscribe({
      next: (emp:any) => {
        //get employee
        this.employee = emp;
      },
      error: () => {
        console.error("Unable to get employee data for employee ID", this.empId)
      },
      // Once employee found (on complete) add todo and done arrays to task columns for logged in employee 
      complete: () => {
        this.todo = this.employee.todo || [];
        this.doing = this.employee.doing || [];
        this.done = this.employee.done || [];

      }
    })
  }

  createTask(form: NgForm) {
    //see if form validation passed 
    if (form.valid) {
      //initialize todoTask with input from user
      const todoTask = form.value.task;
      // API post call
      this.http.post(`/api/employees/${this.empId}/tasks`, {
        text: todoTask
      }).subscribe({
        //callback - add task to to list after successful API completes 
        next: (result: any) => {
          //create new todo object with _id and assign text to form input 
          const newToDoItem = {
            _id: result._id,
            text: todoTask 
          }
          //push new todo object to todo array 
          this.todo.push(newToDoItem);
        },
        //if there is an error, create error message 
        error: (err: any) => {
          console.error('Unable to create task for employee:', err);
        }
      });
    }
  }

  // Update tasks if moved between todo and done arrays 
  updateTask(empId: number, todo: item[], doing: item[], done: item[]) {
    // API call to update tasks 
    this.http.put(`/api/employees/${this.empId}/tasks`, {
      // update new todo and done task arrays 
      todo: todo,
      doing: doing,
      done: done
    }).subscribe({
      // if successful log success message 
      next: (result: any) => {
        console.log('Task updated successfully');
      },
      // is error, log error message
      error: (err: any) => {
        console.error('Unable to update tasks for employee:', err);
      }
    });
  }
  
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      // move items in same table 
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log("Moved Item in array", event.container.data);
    } else {
      // move items between different tables 
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log("Transferred Item to another array", event.container.data);
    }
    // update tasks if they are moved 
    this.updateTask(this.empId, this.todo, this.doing, this.done);
  }

  deleteTask(taskId: string) {
    //dialog box to confirm user wants to delete item 
    if (window.confirm('Are you sure you would like to delete this task?')) {
      //API call to delete task by id  
      this.http.delete(`/api/employees/${this.empId}/tasks/${taskId}`).subscribe({
        next: () => {
          //delete task from the todo or done array and create new array without the taskId
          this.todo = this.todo.filter(t => t._id !== taskId);
          this.doing = this.doing.filter(t => t._id !== taskId);
          this.done = this.done.filter(t => t._id !== taskId);
          console.log('Task deletion successful');
        },
        // if error, send error message 
        error: (err: any) => {
          console.error('Unable to delete task for employee:', err);
        }
      });
    } else {
      //ensure cancel works 
      console.log('User clicked cancel');
    }
  }
  
  
}
  

