const { test, expect } = require('../assertions');
const { data } = require('./data');

/**
 * calcModuleFuel
 * @description take a module's mass, divide by three, round down, and subtract 2.
 * @param number
 * @returns {number}
 */
const calcModuleFuel = (number) => Math.floor(number / 3) - 2;

/**
 * requiredModuleFuel
 * @description recursively calculates the fuel that is necessary because of the extra weight of the fuel itself.
 * @param mass
 * @returns {number} fuel required to launch a module
 */
const requiredModuleFuel = (mass) => {
  // shorthand example:
  // return (calcModuleFuel(mass) <= 0) ? 0 : calcModuleFuel(mass) + requiredModuleFuel(calcModuleFuel(mass));

  // more readable example
  const fuelRemaining = calcModuleFuel(mass) >= 0;
  if (!fuelRemaining) {
    return 0;
  }
  const fuel = calcModuleFuel(mass);
  return fuel + requiredModuleFuel(fuel);
};

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

test('module of mass 14 requires 2 fuel', () => {
  expect(requiredModuleFuel(14)).toBe(2);
});

test('module of mass 1969 requires 966 fuel', () => {
  expect(requiredModuleFuel(1969)).toBe(966);
});

test('module of mass 100756 requires 50346 fuel', () => {
  expect(requiredModuleFuel(100756)).toBe(50346);
});

test(`fuelRequiredAll`, () => {
  expect(requiredModuleFuelAll([14, 1969, 100756])).toBe(51314);
});

/**
 * Answer
 */

console.log(`Answer: ${requiredModuleFuelAll(data)}`);
