const { test, expect } = require('../assertions');
const { data } = require('./data');

/**
 * requiredModuleFuel
 * @description take a module's mass, divide by three, round down, and subtract 2
 * @param mass
 * @returns {number} fuel required to launch a module
 */
const requiredModuleFuel = (mass) => Math.floor(mass / 3) - 2;

/**
 * fuelRequiredAll
 * @description calculate fuel for multiple modules
 * @param values
 * @returns {number} sum of fuel required for all modules
 */
const requiredModuleFuelAll = (values) => values.reduce((total, value) => total + requiredModuleFuel(value), 0);

/**
 * Tests
 */

const testValues = [
  [12, 2],
  [14, 2],
  [1969, 654],
  [100756, 33583]
];

testValues.forEach(function(entry) {
  test(`for the mass of ${entry[0]} fuelRequired calculates ${entry[1]} fuel`, () => {
    expect(requiredModuleFuel(entry[0])).toBe(entry[1]);
  });
});

const testValuesInput = testValues.map((value) => value[0]);
const testValuesTotal = testValues.reduce((total, value) => total + value[1], 0);

test(`fuelRequiredAll`, () => {
  expect(requiredModuleFuelAll(testValuesInput)).toBe(testValuesTotal);
});

/**
 * Answer
 */

console.log(`Answer: ${requiredModuleFuelAll(data)}`);
