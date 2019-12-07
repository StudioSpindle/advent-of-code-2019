type TWire = Array<string>; // i.e. ['R8','U2','L3','D6']
type TWiresFull = Array<TWire>; // [['R1','R2',...],['U0'],['U1'],...]
type TLocation = { x: number; y: number };
type TLocationOnGrid = { locationOnGrid: TLocation };
type TLocationOnWire = { locationPath: string; locationOnGrid: TLocation };
type TDirection = "R" | "U" | "L" | "D";
type TGridLocations = Array<Array<TLocationOnWire>>;

const regExpLetter = /[a-zA-Z]/;
const regExtDigit = /\d+/;

const directionOperations = {
  R: (index: number, lastLocation: TLocation): TLocation => {
    return {
      x: lastLocation.x + index,
      y: lastLocation.y
    };
  },
  U: (index: number, lastLocation: TLocation): TLocation => {
    return {
      x: lastLocation.x,
      y: lastLocation.y + index
    };
  },
  L: (index: number, lastLocation: TLocation): TLocation => {
    return {
      x: lastLocation.x - index,
      y: lastLocation.y
    };
  },
  D: (index: number, lastLocation: TLocation): TLocation => {
    return {
      x: lastLocation.x,
      y: lastLocation.y - index
    };
  }
};

const fullPath = (pathDefinition: string): Array<string> => {
  const matchLetter: RegExpMatchArray | null = pathDefinition.match(
    regExpLetter
  );
  const matchNumberOfSteps: RegExpMatchArray | null = pathDefinition.match(
    regExtDigit
  );

  if (!matchLetter || !matchNumberOfSteps)
    console.warn("skipped since no matched step or letter was found.");

  const direction: TDirection = matchLetter![0] as TDirection;
  const numberOfSteps: string = matchNumberOfSteps![0];

  let wirePath = [];
  for (let i = 0; i <= parseInt(numberOfSteps, 10); i++) {
    const pathPoint = direction + i;
    wirePath.push(pathPoint);
  }
  return [...wirePath]; // A full wire containing all the wire points.
};

const stringified = (object: TLocation): string =>
  JSON.stringify(
    Object.entries(object).sort((a, b) => a[0].localeCompare(b[0]))
  );

const notStartingLocation = ({ locationOnGrid }: TLocationOnGrid): boolean =>
  JSON.stringify(locationOnGrid) !== JSON.stringify({ x: 0, y: 0 });

const pointsFromZero = (number: number): number => Math.abs(number);

const initLocations = (pathToPlot: TWiresFull): Array<TLocationOnWire> => {
  let gridLocations: TGridLocations = [];
  let lastLocation: TLocation = { x: 0, y: 0 };
  let lastLocationInResult: TLocationOnWire = {
    locationPath: "R0",
    locationOnGrid: { x: 0, y: 0 }
  };

  pathToPlot.forEach(points => {
    const result: Array<TLocationOnWire> = [];
    const matchLetter: RegExpMatchArray | null = points[0].match(regExpLetter);

    if (!matchLetter) {
      console.warn("skipped since no matched letter was found.");
      return;
    }
    const direction: TDirection = matchLetter![0] as TDirection;

    points.map((location, index) => {
      result.push({
        locationPath: location,
        locationOnGrid: directionOperations[direction](index, lastLocation)
      });
    });

    lastLocationInResult = result[result.length - 1];
    lastLocation.y = lastLocationInResult.locationOnGrid.y;
    lastLocation.x = lastLocationInResult.locationOnGrid.x;

    gridLocations.push(result);
  });

  // [].concat.apply() flattens the returned array
  return [].concat.apply([], gridLocations as any);
};

const intersectionClosestCalc = (
  wirePaths1: TWire,
  wirePaths2: TWire
): number => {
  const locationsWireRoute1 = initLocations(
    wirePaths1.map(path => fullPath(path.toString()))
  );
  const locationsWireRoute2 = initLocations(
    wirePaths2.map(path => fullPath(path.toString()))
  );
  const stringifiedLocationsWireRoute1: Set<string> = new Set(
    locationsWireRoute1.map(({ locationOnGrid }) => stringified(locationOnGrid))
  );
  const commonPaths = locationsWireRoute2.filter(
    ({ locationOnGrid }): boolean =>
      stringifiedLocationsWireRoute1.has(stringified(locationOnGrid))
  );
  const filteredCommonPaths = commonPaths.filter(notStartingLocation);
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

export { intersectionClosestCalc };
