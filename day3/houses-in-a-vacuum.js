'use strict';
let fs = require('fs');
let file = './input';

//Read file input
fs.readFile(file, 'utf8', (err, input) => {
  if(err) {
    throw new Error(err);
  }

  housesInAVacuum(input);
});

function housesInAVacuum(directions) {
  //Map of grid
  let grid = new Map();

  //Santas position
  let santaPos = new Position();

  //Robo-santas position
  let roboPos = new Position();

  //Current position
  let pos = santaPos;

  for(let i = 0; i < directions.length; i++) {
    //Change position reference based on odd or even direction
    if(i % 2 === 0) {
      pos = santaPos;
    } else {
      pos = roboPos;
    }

    if(directions[i] === '>') {
      pos.incrementX();
    }

    if(directions[i] === '<') {
      pos.decrementX();
    }

    if(directions[i] === '^') {
      pos.incrementY();
    }

    if(directions[i] === 'v') {
      pos.decrementY();
    }

    deliverPresent(grid, pos);
  }

  console.log('Houses with atleast 1 present:', grid.size);
}

function deliverPresent(grid, pos) {
  let key = pos.toString();
  if(grid.has(key)) {
    let num = grid.get(key);
    grid.set(key, num + 1);
  } else {
    grid.set(key, 1);
  }
}

class Position {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  incrementY() {
    this.y++;
  }

  decrementY() {
    this.y--;
  }

  incrementX() {
    this.x++;
  }

  decrementX() {
    this.x--;
  }

  toString() {
    return '(' + this.x + ',' + this.y + ')';
  }
}
