'use strict';
let fs = require('fs');
let file = './input';

//Read file input
fs.readFile(file, 'utf8', (err, input) => {
  if(err) {
    throw new Error(err);
  }

  console.log('Deliver to floor ' + notQuiteLisp(input));
  console.log('First negative floor index', notQuiteLisp2(input));
});

/**
* Find the delivery floor iteratively
* @params {String}
* @return {Integer}
**/
function notQuiteLisp(input) {
  let result = 0;

  if(!input) {
      throw new Error('Usage: No input provided.');
  }

  for(let i = 0; i < input.length; i++) {
    if(input[i] === '(') {
      result++;
    }
    if(input[i] === ')') {
      result--;
    }
  }

  return result;
}

/**
* Find the first floor the causes a negative result
* @params {String}
* @return {Integer}
**/
function notQuiteLisp2(input) {
  let result = 0;

  if(!input) {
      throw new Error('Usage: No input provided.');
  }

  for(let i = 0; i < input.length; i++) {
    if(input[i] === '(') {
      result++;
    }
    if(input[i] === ')') {
      result--;
    }

    if(result < 0) {
      return i+1;
    }
  }

  return -1;
}
