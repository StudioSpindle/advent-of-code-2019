import { test, expect } from "../../assertions";
import locations from "./locations.json";
import { intersectionClosestCalc } from "./script";

test('test [["R8","U5","L5","D3"],["U7","R6","D4","L4"]]', () => {
  const testProgram = [
    ["R8", "U5", "L5", "D3"],
    ["U7", "R6", "D4", "L4"]
  ];
  const testProgramResult = 6;
  expect(intersectionClosestCalc(testProgram[0], testProgram[1])).toEqual(
    testProgramResult
  );
});

test('test [["R75","D30","R83","U83","L12","D49","R71","U7","L72"],["U62","R66","U55","R34","D71","R55","D58","R83"]]', () => {
  const testProgram = [
    ["R75", "D30", "R83", "U83", "L12", "D49", "R71", "U7", "L72"],
    ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"]
  ];
  const testProgramResult = 159;
  expect(intersectionClosestCalc(testProgram[0], testProgram[1])).toEqual(
    testProgramResult
  );
});

test('test [["R98","U47","R26","D63","R33","U87","L62","D20","R33","U53","R51"],["U98","R91","D20","R16","D67","R40","U7","R15","U6","R7"]]', () => {
  const testProgram = [
    ["R98","U47","R26","D63","R33","U87","L62","D20","R33","U53","R51"],
    ["U98", "R91", "D20", "R16", "D67", "R40", "U7", "R15", "U6", "R7"]
  ];
  const testProgramResult = 135;
  expect(intersectionClosestCalc(testProgram[0], testProgram[1])).toEqual(
    testProgramResult
  );
});

console.log(
  `Answer of day 3, part 1: ${intersectionClosestCalc(
    locations[0],
    locations[1]
  )}`
);
