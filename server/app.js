/*
============================================
; Title:  app.js
; Author: Professor Krasso
; Date: 30. May, 2024
; Modified by: Joanna Brumfield
; Description: App Server
;===========================================
*/
'use strict' //

// Require statements
const express = require('express')
const createServer = require('http-errors')
const path = require('path')
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const employeeRoutes = require('./routes/employee-routes');

// Create the Express app
const app = express()

// Configure the app
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../dist/nodebucket')))
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')))


// object literal named options for API testing
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NodeBucket API\'s',
      version: '1.0.0',
    },
  },
  apis: ['./routes/employee-routes.js']    
};

//connect APIs
app.use("/api/employees", employeeRoutes);

//Create a new variable name openapiSpecification and call the swaggerJsdoc library using the options object literal.  For example, const openapiSpecification = swaggerJsdoc(options);
const openapiSpecification = swaggerJsdoc(options);

//Wire the openapiSpecification variable to the app variable (see Exhibit D).
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// error handler for 404 errors
app.use(function(req, res, next) {
  next(createServer(404)) // forward to error handler
})

// error handler for all other errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500) // set response status code

  // send response to client in JSON format with a message and stack trace
  res.json({
    type: 'error',
    status: err.status,
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  })
})

module.exports = app // export the Express application