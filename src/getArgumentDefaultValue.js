const getStringifiedEntityName = require("./getStringifiedEntityName.js");
const parseType = require("./parseType.js");

class ArgumentInvalidType extends Error {
  constructor(argType) {
    const message = `Argument 'arg' of getArgumentDefaultValue(arg) has invalid type - ${argType}. Argument type must be a string.`;
    super(message);
  }
}

class ArgumentIsEmptyString extends Error {
  constructor() {
    super(`Argument 'arg' is an empty string.`);
  }
}

// What if argument default value is primitive or a stringified object (not JSON object, but object like a simple string) ???
function getArgumentDefaultValue(argStr) {
  const argType = parseType(argStr);
  if (argType !== "string") throw new ArgumentInvalidType(argType);
  if (argStr === "") throw new ArgumentIsEmptyString();
  const parts = argStr.split("=");
  return {
    name: parts[0].trim(),
    value:
      parts.length > 1 ? getStringifiedEntityName(parts[1].trim()) : undefined,
  };
}

module.exports = getArgumentDefaultValue;
