#!/usr/bin/env node
'use strict';
require('dotenv').config();

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'dev';
}

// module dependencies
const http = require('http');
const config = require('config');
const app = require('../app');
const handlers = require('./handlers');

const { host, port } = config;

// create http server
const server = http.createServer(app);

// listen on provided ports
server.listen(port, host);

// add error handler
server.on('error', handlers.onError);

// start listening on port
server.on('listening', () => handlers.onListening(host, port));
