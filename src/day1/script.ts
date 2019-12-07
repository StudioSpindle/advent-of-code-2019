
const calcModuleFuel = (number: number): number => Math.floor(number / 3) - 2;

const requiredModuleFuel = (mass: number): number => {
  // shorthand example:
  // return (calcModuleFuel(mass) <= 0) ? 0 : calcModuleFuel(mass) + requiredModuleFuel(calcModuleFuel(mass));

  const fuelRemaining = calcModuleFuel(mass) >= 0;
  if (!fuelRemaining) {
    return 0;
  }
  const fuel = calcModuleFuel(mass);
  return fuel + requiredModuleFuel(fuel);
};

const requiredModuleFuelAll = (masses: Array<number>): number =>
  masses.reduce((total, value) => total + requiredModuleFuel(value), 0);

export { requiredModuleFuel, requiredModuleFuelAll };
