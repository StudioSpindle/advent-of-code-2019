const { test, expect } = require('../assertions');
const { data } = require('./data');

const calc = (array, currentPosition, targetPosition, multiply) => {
  const position1 = array[currentPosition];
  const position2 = array[currentPosition + 1];
  const addOrSubtract = (multiply ? '*' : '+' );

  const total = eval(array[position1] + addOrSubtract + array[position2]);

  array.splice(targetPosition, 1, parseInt(total, 10));
  return array;
};

const GAProgram = (intCode, startPosition) => {
  let newCode = intCode;
  for (let i = startPosition; i < newCode.length; i++) {
    const targetPosition = intCode[i + 3];
    if (newCode[i] === 1) {
      newCode = calc(intCode, i + 1, targetPosition);
      i += 3;
    }
    if (newCode[i] === 2) {
      newCode = calc(intCode, i + 1, targetPosition, true);
      i += 3;
    }
    if (newCode[i] === 99) {
      break;
    }
  }
  return newCode;
};

test('test [1,9,10,3,2,3,11,0,99,30,40,50]', () => {
  const testProgram = [1,9,10,3,2,3,11,0,99,30,40,50];
  const testProgramResult = [3500,9,10,70,2,3,11,0,99,30,40,50];
  expect(GAProgram(testProgram, 0)).toEqual(testProgramResult);
});

test('test [1,0,0,0,99]', () => {
  const testProgram = [1,0,0,0,99];
  const testProgramResult = [2,0,0,0,99];
  expect(GAProgram(testProgram, 0)).toEqual(testProgramResult);
});

test('test [2,3,0,3,99]', () => {
  const testProgram = [2,3,0,3,99];
  const testProgramResult = [2,3,0,6,99];
  expect(GAProgram(testProgram, 0)).toEqual(testProgramResult);
});

test('test [2,4,4,5,99,0]', () => {
  const testProgram = [2,4,4,5,99,0];
  const testProgramResult = [2,4,4,5,99,9801];
  expect(GAProgram(testProgram, 0)).toEqual(testProgramResult);
});

test('test [1,1,1,4,99,5,6,0,99]', () => {
  const testProgram = [1,1,1,4,99,5,6,0,99];
  const testProgramResult = [30,1,1,4,2,5,6,0,99];
  expect(GAProgram(testProgram, 0)).toEqual(testProgramResult);
});

console.log(`Answer: ${GAProgram(data, 0)[0]}`);
