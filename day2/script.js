/**
 * @namespace day2Utils
 */
const day2Utils = function() {
  /**
   * calc
   * @param param1 {number} to calculate
   * @param param2 {number} to calculate
   * @param multiply {boolean} whether or not it should be multiplied
   * @returns {number} The result of the calculation
   */
  const calc = (param1, param2, multiply) => {
    const addOrSubtract = multiply ? "*" : "+";
    const total = eval(param1 + addOrSubtract + param2);
    return parseInt(total, 10);
  };

  /**
   * @param arrayOfIntegers {array} the list of integers to run the program against
   * @param index? {integer} the index from which to start the program (used to step into next program)
   * @returns {array} the array after the program has run. Usually the first integer of this array is the answer
   */
  const GAProgram = (arrayOfIntegers, index = 0) => {
    const operationType = { 1: false, 2: true };
    const memory = [...arrayOfIntegers];
    let operationCode = arrayOfIntegers[index];

    if (index > arrayOfIntegers.length) {
      throw new Error(
        "The operation did not encounter an opcode to end the program (99)."
      );
    }

    if (operationCode === 99) {
      return memory;
    }

    if (operationCode === 1 || operationCode === 2) {
      const noun = arrayOfIntegers[index + 1];
      const verb = arrayOfIntegers[index + 2];
      const destinationAddress = index + 3;
      const newValue = calc(
        memory[noun],
        memory[verb],
        operationType[operationCode]
      );
      memory.splice(memory[destinationAddress], 1, newValue);
    }

    return GAProgram(memory, index + 4);
  };

  /**
   * @description will find the error code of a certain program
   * @param arrayOfIntegers {array} the list of integers to run the program against
   * @param targetValue {number} the end result of the program to match
   */
  const GAProgramDebug = (arrayOfIntegers, targetValue) => {
    for (let noun = 0; noun <= 99; noun++) {
      for (let verb = 0; verb <= 99; verb++) {
        let localState = [...arrayOfIntegers]; // make array immutable
        localState[1] = noun;
        localState[2] = verb;
        const currentResult = GAProgram(localState)[0];

        // DEBUG
        // console.log('current result: ', currentResult);

        if (currentResult === targetValue) {
          return 100 * noun + verb;
        }
      }
    }

    return "Value not found.";
  };

  return {
    GAProgram: GAProgram,
    GAProgramDebug: GAProgramDebug
  };
};

module.exports = { day2Utils };
