import { test, expect } from "../../assertions";
import listOfIntegers from "./listOfIntegers.json";
import { GAProgram, GAProgramDebug } from "./script";

test("test [1,9,10,3,2,3,11,0,99,30,40,50]", () => {
  const testProgram = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50];
  const testProgramResult = [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50];
  expect(GAProgram(testProgram)).toEqual(testProgramResult);
});

test("test [1,0,0,0,99]", () => {
  const testProgram = [1, 0, 0, 0, 99];
  const testProgramResult = [2, 0, 0, 0, 99];
  expect(GAProgram(testProgram)).toEqual(testProgramResult);
});

test("test [2,3,0,3,99]", () => {
  const testProgram = [2, 3, 0, 3, 99];
  const testProgramResult = [2, 3, 0, 6, 99];
  expect(GAProgram(testProgram)).toEqual(testProgramResult);
});

test("test [2,4,4,5,99,0]", () => {
  const testProgram = [2, 4, 4, 5, 99, 0];
  const testProgramResult = [2, 4, 4, 5, 99, 9801];
  expect(GAProgram(testProgram)).toEqual(testProgramResult);
});

test("test [1,1,1,4,99,5,6,0,99]", () => {
  const testProgram = [1, 1, 1, 4, 99, 5, 6, 0, 99];
  const testProgramResult = [30, 1, 1, 4, 2, 5, 6, 0, 99];
  expect(GAProgram(testProgram)).toEqual(testProgramResult);
});

test("answer of day 2 part 1 is still correct", () => {
  expect(GAProgram(listOfIntegers)[0]).toBe(9706670);
});

test("answer of day 2 part 2 is still correct", () => {
  expect(GAProgramDebug(listOfIntegers, 19690720)).toBe(2552);
});

console.log(
  `Answer of day 2, part 2: ${GAProgramDebug(listOfIntegers, 19690720)}`
);
