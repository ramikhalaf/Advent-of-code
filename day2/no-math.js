'use strict';
let fs = require('fs');
let file = './input';

//Read file input
fs.readFile(file, 'utf8', (err, input) => {
  if(err) {
    throw new Error(err);
  }

  let dimensions = input.split('\n');
  let results = noMath(dimensions);
  console.log('Total paper needed in sq ft ' + results.total);
  console.log('Total ribbon length needed in sq ft', results.ribbonTotal);
});

function noMath(dimensions) {
  let total = 0;
  let ribbonTotal = 0;

  if(!dimensions || dimensions.length === 0) {
    throw new Error('Usage: No box dimensions as input.');
  }

  dimensions.forEach(function(dimension) {
    //If no dimensions are inputted
    if(!dimension) {
      return;
    }

    let box = new Box(dimension);
    //part1
    total += box.getTotalPaper();

    //part2
    ribbonTotal += box.getRibbonLength();
  });

  return {total, ribbonTotal};
}

//Box class
class Box {
  constructor(dimensions) {
    let [length = 0, width = 0, height = 0] = dimensions.split('x');

    this.length = Number(length);
    this.width = Number(width);
    this.height = Number(height);
  };

  getSurfaceArea() {
    let length = this.length;
    let width = this.width;
    let height = this.height;

    return (2*length*width) + (2*width*height) + (2*height*length);
  };

  getSmallestSideArea() {
    let length = this.length;
    let width = this.width;
    let height = this.height;

    let min = length*width;
    min = (width*height) < min ? (width*height) : min;
    min = (height*length) < min ? (height*length) : min;

    return min;
  };

  getVolume() {
    let length = this.length;
    let width = this.width;
    let height = this.height;

    return length*width*height;
  }

  getSmallestPerimeter() {
    let {side1, side2} = this.getTwoSmallestSides();
    return (2*side1) + (2*side2);
  }

  getTwoSmallestSides() {
    let length = this.length;
    let width = this.width;
    let height = this.height;

    let side1 = length;
    let side2 = width;

    if(side2 < side1) {
      side1 = side2;
      side2 = length;
    }

    if(height < side1) {
      side2 = side1;
      side1 = height;
    } else if(height < side2) {
      side2 = height;
    }

    return { side1, side2 };
  }

  getTotalPaper() {
    return this.getSurfaceArea() + this.getSmallestSideArea();
  };

  getRibbonLength() {
    return this.getSmallestPerimeter() + this.getVolume();
  }

  toString() {
    return 'Box with dimensions LxWxH ' + this.length + 'x' + this.width + 'x' + this.height;
  }
}
