const { test, expect } = require('../assertions');
const { data } = require('./data');

/**
 *
 * @param array the array to adjust
 * @param param1 {int} the first parameter to run the calculation on
 * @param param2 {int} the second parameter to run  the calculation on
 * @param multiply {bool}
 * @returns {*}
 */
const calc = (param1, param2, multiply) => {
  const addOrSubtract = (multiply ? '*' : '+' );
  const total = eval(param1 + addOrSubtract + param2);
  return parseInt(total, 10);
};

/**
 * GAProgram
 * @param intCode {array} the array to run the program on
 * @param startAddress {int} the location where the program should start
 * @returns {array} the new array calculated by the gravity assist program
 * @constructor
 */
const GAProgram = (intCode, startAddress) => {
  let newCode = [...intCode]; // make array immutable
  for (let instructionPointer = startAddress; instructionPointer < newCode.length; instructionPointer++) {
    const opCode = newCode[instructionPointer];
    const address1 = newCode[instructionPointer + 1];
    const address2  = newCode[instructionPointer + 2];
    const address3 = newCode[instructionPointer + 3];

    if (opCode === 1)
      newCode.splice(address3, 1, calc(newCode[address1], newCode[address2], false));

    if (opCode === 2)
      newCode.splice(address3, 1, calc(newCode[address1], newCode[address2], true));

    if (opCode === 99)
      break;

    /* move to the next instruction, step forward 4 positions (1 opcode + 3 parameters) */
    instructionPointer += 4 - 1; // -1 (array index starts at 0)
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
