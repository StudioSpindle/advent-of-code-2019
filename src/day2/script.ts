
const calc = (param1: number, param2: number, multiply: boolean): number => {
  const addOrSubtract = multiply ? "*" : "+";
  const total = eval(param1 + addOrSubtract + param2);
  return parseInt(total, 10);
};

const GAProgram = (arrayOfIntegers: Array<number>, index: number = 0): Array<number> => {
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

const GAProgramDebug = (arrayOfIntegers: Array<number>, targetValue: number): number | string => {
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      let localState = [...arrayOfIntegers]; // make array immutable
      localState[1] = noun;
      localState[2] = verb;
      const currentResult = GAProgram(localState)[0];

      if (currentResult === targetValue) {
        return 100 * noun + verb;
      }
    }
  }

  return "Value not found.";
};

export { GAProgram, GAProgramDebug };
