'use strict';

// implement mixin logable()

const logable = (client) => {
  client.log = () => console.log('Client logged');
};

const client = {};

console.log('Mixin logable() adds method: log');
logable(client);
console.log('Before log');
client.log();
console.log('After log');
