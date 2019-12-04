const { test, expect } = require('../assertions');
const { listOfIntegers } = require('./listOfIntegers');

/**
 * calc
 * @param param1 {string}
 * @param param2 {string}
 * @param multiply {boolean} whether or not it should be
 * @returns {number}
 */
const calc = (param1, param2, multiply) => {
  const addOrSubtract = (multiply ? '*' : '+' );
  const total = eval(param1 + addOrSubtract + param2);
  return parseInt(total, 10);
};

/**
 * GAProgram
 * @param arrayOfIntegers {array} the list of integers to run the program against
 * @param index? {integer} the index from which to start the program (used to step into next program)
 * @returns {array} the array after the program has run. Usually the first integer of this array is the answer
 * @constructor
 */
const GAProgram = (arrayOfIntegers, index = 0) => {
  const operationType = { 1: false, 2: true };
  const memory = [...arrayOfIntegers];
  let operationCode = arrayOfIntegers[index];

  if (index > arrayOfIntegers.length) {
    throw new Error('The operation did not encounter an opcode to end the program (99).');
  }

  if (operationCode === 99) {
    return memory;
  }

  if (operationCode === 1 || operationCode === 2) {
    const noun = arrayOfIntegers[index + 1];
    const verb = arrayOfIntegers[index + 2];
    const destinationAddress = index + 3;
    const newValue = calc(memory[noun], memory[verb], operationType[operationCode]);
    memory.splice(memory[destinationAddress], 1, newValue);
  }

  return GAProgram(memory, index + 4);
};

test('test [1,9,10,3,2,3,11,0,99,30,40,50]', () => {
  const testProgram = [1,9,10,3,2,3,11,0,99,30,40,50];
  const testProgramResult = [3500,9,10,70,2,3,11,0,99,30,40,50];
  expect(GAProgram(testProgram)).toEqual(testProgramResult);
});

test('test [1,0,0,0,99]', () => {
  const testProgram = [1,0,0,0,99];
  const testProgramResult = [2,0,0,0,99];
  expect(GAProgram(testProgram)).toEqual(testProgramResult);
});

test('test [2,3,0,3,99]', () => {
  const testProgram = [2,3,0,3,99];
  const testProgramResult = [2,3,0,6,99];
  expect(GAProgram(testProgram)).toEqual(testProgramResult);
});

test('test [2,4,4,5,99,0]', () => {
  const testProgram = [2,4,4,5,99,0];
  const testProgramResult = [2,4,4,5,99,9801];
  expect(GAProgram(testProgram)).toEqual(testProgramResult);
});

test('test [1,1,1,4,99,5,6,0,99]', () => {
  const testProgram = [1,1,1,4,99,5,6,0,99];
  const testProgramResult = [30,1,1,4,2,5,6,0,99];
  expect(GAProgram(testProgram)).toEqual(testProgramResult);
});

test('answer of day 2 part 1 is still correct', () => {
  expect(GAProgram(listOfIntegers)[0]).toBe(9706670);
});

/**
 * GAProgramDebug
 * @description will find the error code of a certain program
 * @param arrayOfIntegers {array} the list of integers to run the program against
 * @param targetValue {integer} the endresult of the program to match
 * @constructor
 */
const GAProgramDebug = (arrayOfIntegers, targetValue) => {
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb ++) {
      let localState = [...arrayOfIntegers]; // make array immutable
      localState[1] = noun;
      localState[2] = verb;
      const currentResult = GAProgram(localState)[0];

      // DEBUG
      // console.log('current result: ', currentResult);

      if (currentResult === targetValue) {
        return 100 * noun + verb;
      }
    }
  }

  return 'Value not found.';
};

test('answer of day 2 part 2 is still correct', () => {
  expect(GAProgramDebug(listOfIntegers, 19690720)).toBe(2552);
});

console.log(`Answer of day 2, part 2: ${GAProgramDebug(listOfIntegers, 19690720)}`);

