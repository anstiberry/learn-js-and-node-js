#!/usr/bin/env node
'use strict';

// module dependencies
const path = require('path');
const error = require('http-errors');
const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');

const { pathToImagesDir } = config;

let app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(pathToImagesDir));
app.use(express.static(path.join(__dirname, 'views/public/')));

app.use('/', router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(error(404));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.end(err.message);
});

module.exports = app;
