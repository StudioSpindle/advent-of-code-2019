/**
 *
 * @param actual
 * @returns {{toEqual(*=): void, toBe(*): void}}
 */
const expect = function(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    },
    toEqual(expected) {
      if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    }
  };
};

/**
 *
 * @param title
 * @param callback
 */
const test = function(title, callback) {
  try {
    callback();
    console.log(`✓ ${title}`);
  } catch (error) {
    console.error(`✗ ${title}`);
    console.error(error);
  }
};

module.exports = { test, expect };
