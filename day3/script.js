/**
 * @namespace day3Utils
 */
const day3Utils = function() {
  const regExpLetter = /[a-zA-Z]/;
  const regExtDigit = /\d+/;

  /**
   * @description Operations to calculate x and y coordinates based on the direction
   * @type {{R: (function(*, *): {x: *, y: *}), D: (function(*, *): {x: *, y: number}), U: (function(*, *): {x: *, y: *}), L: (function(*, *): {x: number, y: *})}}
   */
  const directionOperations = {
    R: (index, lastLocation) => {
      return {
        x: lastLocation.x + index,
        y: lastLocation.y
      };
    },
    U: (index, lastLocation) => {
      return {
        x: lastLocation.x,
        y: lastLocation.y + index
      };
    },
    L: (index, lastLocation) => {
      return {
        x: lastLocation.x - index,
        y: lastLocation.y
      };
    },
    D: (index, lastLocation) => {
      return {
        x: lastLocation.x,
        y: lastLocation.y - index
      };
    }
  };

  /**
   * @description Calculates a full path based on a wire.
   * @param {string} pathDefinition The path definition as defined by 'locations'.
   * @returns {Array} A full wire containing all the wire points.
   */
  const fullPath = pathDefinition => {
    const direction = pathDefinition.match(regExpLetter)[0];
    const numberOfSteps = pathDefinition.match(regExtDigit)[0];
    let wirePath = [];
    for (let i = 0; i <= numberOfSteps; i++) {
      const pathPoint = direction + i;
      wirePath.push(pathPoint);
    }
    return [...wirePath];
  };

  /**
   * @desc Makes an object stringified
   * @param {Object} object The x and y coordinate
   * @returns {string}
   */
  const stringified = object =>
      JSON.stringify(
          Object.entries(object).sort((a, b) => a[0].localeCompare(b[0]))
      );

  /**
   * @desc Filters out the starting location.
   * @param {Object} object to filter.
   * @returns {boolean} Whether the location provided is the starting location or not.
   */
  const notStartingLocation = ({ locationOnGrid }) =>
      JSON.stringify(locationOnGrid) !== JSON.stringify({ x: 0, y: 0 });

  /**
   * @desc Calculates how far from zero a number is.
   * @param {number} The number to match against.
   * @returns {number} The distance from zero.
   */
  const pointsFromZero = number => Math.abs(number - 0);

  /**
   * @param pathToPlot {Array} Containing all the wire points for a single wire path
   * @returns {Array} Containing a full path with x and y coordinates for a wire path
   */
  const initLocations = pathToPlot => {
    let gridLocations = [];
    let lastLocation = {
      x: 0,
      y: 0
    };

    pathToPlot.forEach(points => {
      const result = [];
      const direction = points[0].match(regExpLetter)[0];

      points.map((location, index) => {
        result.push({
          locationPath: location,
          locationOnGrid: directionOperations[direction](index, lastLocation)
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

  /**
   * @description Calculates the Manhattan distance of the closest intersection of two wire paths
   * @param {Array} wirePaths1 A wire containing the directions with number of steps.
   * @param  {Array} wirePaths2 A wire containing the directions with number of steps.
   * @returns {number} Manhattan distance
   */
  const intersectionClosestCalc = (wirePaths1, wirePaths2) => {

    const locationsWireRoute1 = initLocations(
      wirePaths1.map(path => fullPath(path))
    );
    const locationsWireRoute2 = initLocations(
      wirePaths2.map(path => fullPath(path))
    );

    /**
     * @desc normalise key/value pairs for comparison
     * @type {Set<string>}
     */
    const stringifiedLocationsWireRoute1 = new Set(
      locationsWireRoute1.map(({ locationOnGrid }) =>
        stringified(locationOnGrid)
      )
    );

    /**
     * @desc filters the duplicate routes out
     * @note switch the two arrays (locationsWireRoute<x>) will change the returned location path
     * @type {Array}
     */
    const commonPaths = locationsWireRoute2.filter(({ locationOnGrid }) =>
      stringifiedLocationsWireRoute1.has(stringified(locationOnGrid))
    );

    const filteredCommonPaths = commonPaths.filter(notStartingLocation);

    /**
     * @description Manhattan distance can be used, so x + y = distance from starting location
     * @type {Object}
     */
    const lowest = filteredCommonPaths.reduce((prev, curr) => {
      return pointsFromZero(prev.locationOnGrid.x) +
        pointsFromZero(prev.locationOnGrid.y) <
        pointsFromZero(curr.locationOnGrid.x) +
          pointsFromZero(curr.locationOnGrid.y)
        ? prev
        : curr;
    });

    return lowest.locationOnGrid.x + lowest.locationOnGrid.y;
  };

  return {
    intersectionClosestCalc: intersectionClosestCalc
  };
};

module.exports = { day3Utils };
