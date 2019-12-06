const { test, expect } = require("../assertions");
const { data } = require("./data");
const { day1Utils } = require("./script");

const day1 = new day1Utils();

test("module of mass 14 requires 2 fuel", () => {
  expect(day1.requiredModuleFuel(14)).toBe(2);
});

test("module of mass 1969 requires 966 fuel", () => {
  expect(day1.requiredModuleFuel(1969)).toBe(966);
});

test("module of mass 100756 requires 50346 fuel", () => {
  expect(day1.requiredModuleFuel(100756)).toBe(50346);
});

test(`fuelRequiredAll`, () => {
  expect(day1.requiredModuleFuelAll([14, 1969, 100756])).toBe(51314);
});

console.log(`Answer: ${day1.requiredModuleFuelAll(data)}`);


