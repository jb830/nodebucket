/*
============================================
; Title:  brumfield-emaployess.js
; Author: Professor Krasso
; Date: 1. June, 2024
; Modified by: Joanna Brumfield
; Description: Employee API
;===========================================
*/

'use strict';
const express = require('express');
const { mongo } = require('../utils/mongo');
const createError = require('http-errors');
const Ajv = require('ajv');
const { ObjectId } = require('mongodb');
const ajv = new Ajv();
const router = express.Router();

/**
 * findEmployeeById
 * @openapi
 * /api/employees/{empId}:
 *   get:
 *     tags:
 *       - employees
 *     description: Returns employee by predefined empId
 *     summary: Returns an employee document
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee document requested by user
 *       400:
 *         description: Bad request 
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Server exception
 */
router.get('/:empId', (req, res, next) => {
  try {
    let {
      empId
    } = req.params;
    empId = parseInt(empId, 10);
    //if input not numerical,return 400 
    if (isNaN(empId)) {
      const err = new Error('Input must be a number');
      err.status = 400;
      console.error(400, 'Input must be a number');
      return next(err);
    }

    //fund employee by ID 
    mongo(async (db) => {
      const employee = await db.collection('employees').findOne({
        empId
      });
      //If no employee ID matches, send 404  
      if (!employee) {
        console.error('Employee not found', empId);
        return next(createError(404, 'Employee not found'));
      }

      //if no errors, return employee object by ID 
      res.json(employee);
    }, next);

  } catch (err) {
    console.error('Error:', err);
    next(err);
  }
});

/**
 * findAllTasks
 * @openapi
 * /api/employees/{empId}/tasks:
 *   get:
 *     tags:
 *       - employees
 *     description: Returns tasks for employee by empId
 *     summary: Returns tasks for employee
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: Employee document ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success - Array of task items 
 *       400:
 *         description: Bad request
 *       404:
 *         description: Employee or Tasks Not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:empId/tasks', (req, res, next) => {
  try {
    let empId = req.params.empId;
    empId = parseInt(empId, 10);

    if (isNaN(empId)) {
      return next(createError(400, 'Employee ID must be a number'));
    }

    mongo(async (db) => {
      const tasks = await db.collection('employees').findOne({
        empId: empId
      }, {
        projection: {
          empId: 1,
          todo: 1,
          doing: 1,
          done: 1
        }
      });
      console.log('tasks', tasks);
      //if not employee has matching empId, return 404 
      if (!tasks) {
        return next(createError(404, `Employee not found for empId ${empId}`));
      }
      //if there are no tasks for employee, send 404 no tasks found 
      if (!tasks.todo && !tasks.done) {
        return next(createError(404, `No tasks exist for this employee ${empId}`));
      }
      //If tasks exist return the document 
      res.send(tasks);
    }, next);

  } catch (err) {
    console.error('Error:', err);
    next(err);
  }
});

/**
 * createTask
 * @openapi
 * /api/employees/{empId}/tasks:
 *   post:
 *     tags:
 *       - employees
 *     description: Creates a new task for an employee
 *     summary: Creates a new task
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Task object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *             required:
 *               - text
 *     responses:
 *       201:
 *         description: Task Created / no return data but something created
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */

const addTaskSchema = {
  type: 'object',
  required: ['text'],
  additionalProperties: false,
  properties: {
    text: {
      type: 'string'
    }
  }
};

router.post('/:empId/tasks', (req, res, next) => {
  try {
    let {
      empId
    } = req.params;
    empId = parseInt(empId, 10);
    //if input not numerical, return 400
    if (isNaN(empId)) {
      return next(createError(400, 'Employee ID must be a number'));
    }

    mongo(async (db) => {
      const employee = await db.collection('employees').findOne({
        empId: empId
      }, {
        projection: {
          empId: 1,
          todo: 1,
          doing: 1,
          done: 1
        }
      });
      console.log('tasks', employee);
      //if no employee has matching empId, return 404
      if (!employee) {
        return next(createError(404, `Employee not found for empId ${empId}`));
      }
      //compile task schema 
      const validate = ajv.compile(addTaskSchema);
      //validate against schema 
      const valid = validate(req.body);
      //if validation fails send 400 
      if (!valid) {
        return next(createError(400, 'Invalid task payload', validate.errors));
      }
      console.log("Validation Success")

      const newTask = {
        _id: new ObjectId(),
        text: req.body.text
      };

      const result = await db.collection('employees').updateOne({
        empId: empId
      }, {
        $push: {
          todo: newTask
        }
      });

      if (!result.modifiedCount) {
        return next(createError(400, 'Unable to create task'));
      }

      res.status(201).send({
        _id: newTask._id,
        text: newTask.text
      });
    }, next);

  } catch (err) {
    console.error('Error:', err);
    next(err);
  }
});


/**
 ** updateTask
 * @openapi
 * /api/employees/{empId}/tasks:
 *   put:
 *     tags:
 *       - tasks
 *     description: Updates task document
 *     summary: updates a task document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: task document
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: No Content/ no return data
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: – Internal Server Error
 */
 const updateTaskSchema = {
  type: 'object',
  required: ['todo', 'doing', 'done'],
  additionalProperties: false,
  properties: {
    todo: {
      type: 'array',
      items: {
        type: 'object',
        required: ['_id', 'text'],
        additionalProperties: false,
        properties: {
          _id: {
            type: 'string'
          },
          text: {
            type: 'string'
          }
        }
      }
    },
    doing: {
      type: 'array',
      items: {
        type: 'object',
        required: ['_id', 'text'],
        additionalProperties: false,
        properties: {
          _id: {
            type: 'string'
          },
          text: {
            type: 'string'
          }
        }
      }
    },
    done: {
      type: 'array',
      items: {
        type: 'object',
        required: ['_id', 'text'],
        additionalProperties: false,
        properties: {
          _id: {
            type: 'string'
          },
          text: {
            type: 'string'
          }
        }
      }
    }
  }
};
router.put('/:empId/tasks', (req, res, next) => {
  try {
    let { empId } = req.params;
    // Make sure employee ID is a number
    empId = parseInt(empId, 10);
    if (isNaN(empId)) {
      return next(createError(400, 'Employee ID must be a number'));
    }
    // Connect to MongoDB
    mongo(async (db) => {
      const employee = await db.collection('employees').findOne({ empId: empId });
      if (!employee) {
        return next(createError(404, `Employee not found for empId ${empId}`));
      }
      // Assign tasks to request
      const tasks = req.body;
      // Validate schema
      const validate = ajv.compile(updateTaskSchema);
      const valid = validate(req.body);
      if (!valid) {
        return next(createError(400, 'Invalid task payload', validate.errors));
      }
      // Update tasks
      const result = await db.collection('employees').updateOne(
        { empId: empId },
        { $set: { todo: tasks.todo, doing: tasks.doing, done: tasks.done } }
      );
      // Success status if tasks were updated
      res.status(204).send('Tasks updated');
    }, next);
  } catch (err) {
    console.error('Error:', err);
    next(err);
  }
});




/**
 ** deleteTask
 * @openapi
 * /api/employees/{empId}/tasks:
 *   delete:
 *     tags:
 *       - tasks
 *     description: Deletes task document
 *     summary: Deletes a task document by id whether it is in 'todo' or 'done' arrays
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: task document
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: No Content/ no return data
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: – Internal Server Error
 */

router.delete('/:empId/tasks/:taskId', (req, res, next) => {
  try { 
    let { empId } = req.params;
    let { taskId } = req.params;

    //Make sure emp ID is a number, if not 400 bad request
    empId = parseInt(empId, 10);
    if (isNaN(empId)) {
      return next(createError(400, 'Employee ID must be a number'));
    }
    //connect to database 
    mongo(async (db) => {

      console.log(taskId)
      //Find employee by ID in database: request only empId, todo array, and done array
      const employee = await db.collection('employees').findOne({
        empId: empId
      });
      //If user is not found, send 404, Not Found
      if (!employee) {
        return next(createError(404, `Employee not found for empId ${empId}`));
      }

      if (!employee.todo) employee.todo = [];
      if (!employee.done) employee.done = [];
      
      const todo = employee.todo.filter(t=> t._id.toString() !== taskId.toString());
      const done = employee.done.filter(t=> t._id.toString() !== taskId.toString());
      
      
      //If user exists, update todo list by pulling the task by taskId
      const result = await db.collection('employees').updateOne({
        empId: empId
      }, {
        $set: { todo: todo, done: done }
      });

      console.log(taskId)
      // If no modifications counted, send 400 error
      if (!result.modifiedCount) {
        return next(createError(400, 'Unable to delete task'));
      }
      // If task deleted, send 204 success, no return data 
      res.status(204).send('Task deleted')
    });

  } catch (err) {
    console.error('Error:', err);
    next(err);
  }
});

module.exports = router;