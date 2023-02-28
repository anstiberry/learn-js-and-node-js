'use strict';

const tagged = (pref, str) => `[${pref}] ${str}`;

// Define function tagDate that prepends current date to the string.
// E.g. tagDate('My String') === '[2019-11-14] My String'
// Use function tagged to implement tagDate.

const tagDate = (text) => {
  const dateString = new Date().toISOString().substring(0, 10);
  const result = tagged(dateString, text);
  console.log(result);
  return result;
};


module.exports = { tagDate };
