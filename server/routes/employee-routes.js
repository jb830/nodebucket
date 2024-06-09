/*
============================================
; Title:  brumfield-emaployess.js
; Author: Professor Krasso
; Date: 1. June, 2024
; Modified by: Joanna Brumfield
; Description: Employee API
;===========================================
*/

"use strict";
const express = require("express");
const { mongo } = require("../utils/mongo");
const createError = require("http-errors");

const router = express.Router();

//404 resource not found 
//500 server exception 
//400 bad request 

/**
 *  * findEmployeeById
 * @openapi
 * /api/employees/{empId}:
 *   get:
 *     tags:
 *       - employees
 *     description: Returns employee by predefined empId
 *     summary: returns a employee document
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: employee document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Employee document requested by user
 *       '400':
 *         description: Bad request 
 *       '404':
 *          description: Employee not found
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get("/:empId", (req, res, next) => {
  try {
    let { empId } = req.params;
    empId = parseInt(empId, 10); 

    //If anything aside from numerical value is entered, send a 400 error //early return
    if(isNaN(empId)) {
      const err = new Error("Input must be a number");
      err.status = 400;
      console.error(400, "Input must be a number" );
      return next(err); 
    }

    //find and return employee if exists, if not send 404 error
    mongo(async db => {
      const employee = await db.collection("employees").findOne({ empId });

      if (!employee) {
        console.error("Employee not found", empId);
        return next(createError(404, "Employee not found"));
      }

      res.json(employee);
    }, next)

  //server error handling   
  } catch (err) {
    console.error("Error:", err);
    next(err);
  }
});

module.exports = router;


// Employees:
// o findAllTasks:
// ▪ Verb: GET
// ▪ Route: localhost:3000/api/employees/:empId/tasks
// ▪ Status: 200 – OK
// ▪ Error Handling:
// • 400 – Bad Request
// • 404 – Not Found
// • 500 – Internal Server Error


// o createTask:
// ▪ Verb: POST
// ▪ Route: localhost:3000/api/employees/:empId/tasks
// ▪ Status: 201 – Created
// ▪ Error Handling:
// • 400 – Bad Request
// • 404 – Not Found
//Special note. Swagger is required and must be used to document the API(s). 