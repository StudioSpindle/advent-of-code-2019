const { test, expect } = require('../assertions');
const { data } = require('./data');

/**
 * fuelRequired
 * @param mass
 * @returns {number} fuel required to launch a module
 */
const fuelRequired = (mass) => Math.floor(mass / 3) - 2;

/**
 * fuelRequiredAll
 * @param values
 * @returns {number} sum of fuel required for all modules
 */
const fuelRequiredAll = (values) => values.reduce((total, value) => total + fuelRequired(value), 0);

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
    expect(fuelRequired(entry[0])).toBe(entry[1]);
  });
});

const values = [12, 14, 1969, 100756];
const testValuesTotal = testValues.reduce((total, value) => total + value[1], 0);

test(`fuelRequiredAll`, () => {
  expect(fuelRequiredAll(values)).toBe(testValuesTotal);
});

/**
 * Answer
 */

console.log(`Answer: ${fuelRequiredAll(data)}`);
