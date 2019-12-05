const { test, expect } = require('../assertions');
const { locations } = require('./locations');

const regExpLetter = /[a-zA-Z]/;
const regExtDigit = /\d+/;

const calcPath = (pathDefinition) => {
  const direction = pathDefinition.match(regExpLetter)[0];
  const numberOfSteps = pathDefinition.match(regExtDigit)[0];
  let wirePath = [];
  for (let i = 0; i <= numberOfSteps; i++) {
    const pathPoint = direction + i;
    wirePath.push(pathPoint);
  }
  return [...wirePath];
};

const directionOperations = {
  "R": (index, lastLocation) => {
    return {
      x: lastLocation.x + index,
      y: lastLocation.y
    }
  },
  "U": (index, lastLocation) => {
    return {
      x: lastLocation.x,
      y: lastLocation.y + index
    }
  },
  "L": (index, lastLocation) => {
    return {
      x: lastLocation.x - index,
      y: lastLocation.y
    }
  },
  "D": (index, lastLocation) => {
    return {
      x: lastLocation.x,
      y: lastLocation.y - index
    }
  },
};

/**
 * intersectionCalc
 * @description Calculates the Manhattan distance of the closest intersection of two paths
 * @returns {number} Manhattan distance
 */
const intersectionCalc = (wirePaths1, wirePaths2) => {

  const initLocations = (pathsToPlot) => {
    let gridLocations = [];
    let lastLocation = {
      x: 0,
      y: 0,
    };

    pathsToPlot.forEach((pathToPlot) => {
      const result = [];
      const direction = pathToPlot[0].match(regExpLetter)[0];

      pathToPlot.map((location, index) => {
        result.push({
          locationPath: location,
          locationOnGrid: directionOperations[direction](index, lastLocation),
        });
      });

      const lastLocationInResult = result[result.length - 1];
      lastLocation.y = lastLocationInResult.locationOnGrid.y;
      lastLocation.x = lastLocationInResult.locationOnGrid.x;
      gridLocations.push(result);
    });

    // [].concat.apply() flattens the returned array
    return [].concat.apply([], gridLocations);
  };

  const locationsWireRoute1 = initLocations(wirePaths1.map((path) => calcPath(path)));
  const locationsWireRoute2 = initLocations(wirePaths2.map((path) => calcPath(path)));

  // DEBUG
  // console.log(locationsWireRoute1);
  // console.log(locationsWireRoute2);

  // TODO: check if this works if either one (locationsWireRoutex) is smaller than the other

  // normalise key/value pairs for comparison
  const stringified = o => JSON.stringify(Object.entries(o).sort((a, b) => a[0].localeCompare(b[0])));
  const notStartingLocation = ({locationOnGrid}) => JSON.stringify(locationOnGrid) !== JSON.stringify({ x: 0, y: 0 });

  // note: switch the two arrays (locationsWireRoute<x>) will change the returned location path
  const stringifiedLocationsWireRoute1 = new Set(locationsWireRoute1.map(({ locationOnGrid }) => stringified(locationOnGrid)));
  const commonPaths = locationsWireRoute2.filter(({ locationOnGrid }) => stringifiedLocationsWireRoute1.has(stringified(locationOnGrid)));

  // DEBUG
  // console.table(commonPaths);

  const filteredCommonPaths = commonPaths.filter(notStartingLocation);
  const pointsFromZero = (number) => Math.abs(number - 0);
  // TODO: make this part more readable
  const lowest = filteredCommonPaths.reduce((prev, curr) => {
    return pointsFromZero(prev.locationOnGrid.x) + pointsFromZero(prev.locationOnGrid.y) < pointsFromZero(curr.locationOnGrid.x) + pointsFromZero(curr.locationOnGrid.y) ? prev : curr;
  });

  // DEBUG
  // console.table(lowest);

  return lowest.locationOnGrid.x + lowest.locationOnGrid.y;
};

test('test [["R8","U5","L5","D3"],["U7","R6","D4","L4"]]', () => {
  const testProgram = [["R8","U5","L5","D3"],["U7","R6","D4","L4"]];
  const testProgramResult = 6;
  expect(intersectionCalc(testProgram[0], testProgram[1])).toEqual(testProgramResult);
});

test('test [["R75","D30","R83","U83","L12","D49","R71","U7","L72"],["U62","R66","U55","R34","D71","R55","D58","R83"]]', () => {
  const testProgram = [["R75","D30","R83","U83","L12","D49","R71","U7","L72"],["U62","R66","U55","R34","D71","R55","D58","R83"]];
  const testProgramResult = 159;
  expect(intersectionCalc(testProgram[0], testProgram[1])).toEqual(testProgramResult);
});

test('test [["R98","U47","R26","D63","R33","U87","L62","D20","R33","U53","R51"],["U98","R91","D20","R16","D67","R40","U7","R15","U6","R7"]]', () => {
  const testProgram = [["R98","U47","R26","D63","R33","U87","L62","D20","R33","U53","R51"],["U98","R91","D20","R16","D67","R40","U7","R15","U6","R7"]];
  const testProgramResult = 135;
  expect(intersectionCalc(testProgram[0], testProgram[1])).toEqual(testProgramResult);
});

console.log(`Answer of day 3, part 1: ${intersectionCalc(locations[0], locations[1])}`);
