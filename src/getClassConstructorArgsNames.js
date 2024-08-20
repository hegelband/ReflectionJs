const { findCloseBraceIndex, splitArgsStrByCommas } = require("./getFunctionArgsNames.js");
const parseType = require("./parseType.js");

/** Class representing an error thrown when getClassConstructorArgsNames `cls` arg has no constructor.
 * @class
 * @extends Error
 */
class HasNoConstructorError extends Error {
	constructor() {
		const message = "DI object has no one constructor. Need one or more.";
		super(message);
	}
}

/** Class representing an error thrown when getClassConstructorArgsNames `cls` arg type isn't a class.
 * @class
 * @extends Error
 */
class ClsArgumentInvalidType extends Error {
	constructor(clsType) {
		const message = `Argument cls with invalid type - ${clsType}. Argument value type must be a class.`;
		super(message);
	}
}

/**
 * @typedef {Object} ParsedArgumentsType
 * @property {number} startPosition
 * @property {string[]} args - constructor stringified args commas separated
 */

/** Returns class constructor arguments
 *
 * @param {function} cls - class
 * @returns {ParsedArgumentsType}
 */
const getClassConstructorArgsNames = (cls) => {
	const clsType = parseType(cls);
	if (clsType !== "class") throw new ClsArgumentInvalidType(clsType);
	const clsStr = cls.toString();
	const separator = "constructor";
	const startIndex = clsStr.indexOf(separator, 0);
	if (startIndex === -1) {
		throw new HasNoConstructorError();
	}
	const openBraceStartIndex = clsStr.indexOf("(", startIndex);
	let closeBraceStartIndex = findCloseBraceIndex(clsStr, openBraceStartIndex);
	const argsStr = clsStr.slice(openBraceStartIndex + 1, closeBraceStartIndex);
	const argsSplittedArray = splitArgsStrByCommas(argsStr);
	const args = argsSplittedArray.map((arg) => arg.trim()).filter((arg) => arg !== "");
	return {
		startPosition: startIndex,
		args,
	};
};

module.exports = getClassConstructorArgsNames;
