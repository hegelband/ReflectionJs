const getStringifiedEntityName = require("./getStringifiedEntityName.js");
const parseType = require("./parseType.js");

/** Class representing an error thrown when getArgumentDefaultValue arg type isn't a string.
 * @class
 * @extends Error
 */
class ArgumentInvalidType extends Error {
	/**
	 *
	 * @param {string} argType - getArgumentDefaultValue arg type
	 */
	constructor(argType) {
		const message = `Argument 'arg' of getArgumentDefaultValue(arg) has invalid type - ${argType}. Argument type must be a string.`;
		super(message);
	}
}

/** Class representing an error thrown when getArgumentDefaultValue arg is an empty string.
 * @class
 * @extends Error
 */
class ArgumentIsEmptyString extends Error {
	constructor() {
		super(`Argument 'arg' is an empty string.`);
	}
}

/**
 * @typedef {Object} GetArgumentDefaultValueReturnType
 * @property {string} name
 * @property {string|undefined} value
 */

// What if argument default value is primitive or a stringified object (not JSON object, but object like a simple string) ???
/** Returns name and default value of argument
 *
 * @param {string} argStr - part of string returned by toString method of function
 * @returns {GetArgumentDefaultValueReturnType}
 */
function getArgumentDefaultValue(argStr) {
	const argType = parseType(argStr);
	if (argType !== "string") throw new ArgumentInvalidType(argType);
	if (argStr === "") throw new ArgumentIsEmptyString();
	const parts = argStr.split("=");
	return {
		name: parts[0].trim(),
		value: parts.length > 1 ? getStringifiedEntityName(parts[1].trim()) : undefined,
	};
}

module.exports = getArgumentDefaultValue;
