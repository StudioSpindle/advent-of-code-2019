type TActual = string | number | Array<number>;
type TExpected = string | number | Array<number>;

const expect = function(actual: TActual) {
  return {
    toBe(expected: TExpected) {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    },
    toEqual(expected: TExpected) {
      if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    }
  };
};

const test = function(title: string, callback: () => void) {
  try {
    callback();
    console.log(`✓ ${title}`);
  } catch (error) {
    console.error(`✗ ${title}`);
    console.error(error);
  }
};

export { test, expect };
