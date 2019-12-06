/**
 * @namespace day1Utils
 */
const day1Utils = function() {
  /**
   * @description take a module's mass, divide by three, round down, and subtract 2.
   * @param {number} number The number to calculate the fuel of
   * @returns {number} The amount of fuel
   */
  const calcModuleFuel = number => Math.floor(number / 3) - 2;

  /**
   * @description Calculates the amount of fuel required to launch a module.
   *              It calculates the fuel recursively because of the extra weight by the fuel itself.
   * @param {number} mass The mass of a module
   * @returns {number} fuel required to launch a module
   */
  const requiredModuleFuel = mass => {
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
   * @description Calculate the fuel recursively for multiple modules.
   * @param {Array} masses The mass of multiple modules to calculate the fuel of
   * @returns {number} Sum of fuel required for all these modules
   */
  const requiredModuleFuelAll = masses =>
    masses.reduce((total, value) => total + requiredModuleFuel(value), 0);

  return {
    requiredModuleFuel: requiredModuleFuel,
    requiredModuleFuelAll: requiredModuleFuelAll
  };
};

module.exports = { day1Utils };
