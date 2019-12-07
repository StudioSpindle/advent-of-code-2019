import { test, expect } from "../../assertions";
import data from "./data.json";
import { requiredModuleFuel, requiredModuleFuelAll } from './script';

test("module of mass 14 requires 2 fuel", () => {
  expect(requiredModuleFuel(14)).toBe(2);
});

test("module of mass 1969 requires 966 fuel", () => {
  expect(requiredModuleFuel(1969)).toBe(966);
});

test("module of mass 100756 requires 50346 fuel", () => {
  expect(requiredModuleFuel(100756)).toBe(50346);
});

test(`fuelRequiredAll`, () => {
  expect(requiredModuleFuelAll([14, 1969, 100756])).toBe(51314);
});

console.log(`Answer: ${requiredModuleFuelAll(data)}`);


