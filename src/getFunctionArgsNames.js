const parseType = require("./parseType.js");

/** Class representing an error thrown when getFunctionArgsNames `func` arg type isn't a function.
 * @class
 * @extends Error
 */
class FuncArgumentInvalidType extends Error {
	/**
	 *
	 * @param {string} funcType
	 */
	constructor(funcType) {
		const message = `Argument func with invalid type - ${funcType}. Argument value type must be a function.`;
		super(message);
	}
}

/** Returns closing brace index
 *
 * @param {string} str
 * @param {number} startIndex
 * @returns {number}
 */
const findCloseBraceIndex = (str, startIndex) => {
	const openBraceIndex = str.indexOf("(", startIndex);
	let closeBraceIndex = str.indexOf(")", openBraceIndex);
	const getOpenBracesCount = (end) =>
		str
			.split("")
			.slice(openBraceIndex, end)
			.map((s, index) => ({ char: s, index }))
			.filter((s) => s.char === "(").length;
	let openBraceBeforeCloseCount = getOpenBracesCount(closeBraceIndex);
	let i = 0;
	while (openBraceBeforeCloseCount > 1) {
		i++;
		closeBraceIndex = str.indexOf(")", closeBraceIndex + 1);
		openBraceBeforeCloseCount = getOpenBracesCount(closeBraceIndex) - i;
	}
	return closeBraceIndex;
};

/** Returns array of commas indexes
 *
 * @param {string} str
 * @returns {number[]}
 */
const findArgsSeparatorCommas = (str) => {
	const allCommas = str
		.split("")
		.map((char, index) => ({ char, index }))
		.filter((s) => s.char === ",");
	let prevCommaIndex = 0;
	const argsSeparatorCommas = allCommas.filter((comma) => {
		const openBracesCount = str
			.slice(prevCommaIndex, comma.index)
			.split("")
			.filter((s) => s === "(").length;
		const closeBracesCount = str
			.slice(prevCommaIndex, comma.index)
			.split("")
			.filter((s) => s === ")").length;
		const openCurlyBracesCount = str
			.slice(prevCommaIndex, comma.index)
			.split("")
			.filter((s) => s === "{").length;
		const closeCurlyBracesCount = str
			.slice(prevCommaIndex, comma.index)
			.split("")
			.filter((s) => s === "}").length;
		if (openBracesCount === closeBracesCount && openCurlyBracesCount === closeCurlyBracesCount) {
			prevCommaIndex = comma.index;
			return true;
		}
		return false;
	});
	return argsSeparatorCommas.map((c) => c.index);
};

/**	Returns arguments stringified by toString
 *
 * @param {string} argsStr
 * @returns {string[]}
 */
const splitArgsStrByCommas = (argsStr) => {
	// -1 is first, because next step will be slice with startIndex = separator[i] + 1
	const separators = [-1, ...findArgsSeparatorCommas(argsStr), null];
	return separators
		.slice(1)
		.map((commaIndex, i) => (commaIndex === null ? argsStr.slice(separators[i] + 1) : argsStr.slice(separators[i] + 1, commaIndex)));
};

/**
 * @typedef { Object } ParsedArgumentsType
 * @property { number } startPosition
 * @property { string[] } args - constructor stringified args commas separated
 */

/**
 *
 * @param {function} func
 * @returns {ParsedArgumentsType}
 */
const getFunctionArgsNames = (func) => {
	const funcType = parseType(func);
	if (funcType !== "function" && funcType !== "function class") throw new FuncArgumentInvalidType(funcType);
	const funcStr = func.toString();
	const openBraceIndex = funcStr.indexOf("(", 0);
	const closeBraceIndex = findCloseBraceIndex(funcStr, openBraceIndex);
	const equalIndex = funcStr.indexOf("=");
	// functions with one argument without braces around:
	// argName => {};
	// argName => doSth(argName);
	const oneArgWithoutBraces = equalIndex !== -1 && (openBraceIndex === -1 || equalIndex < openBraceIndex);
	let argsStr;
	if (oneArgWithoutBraces) {
		argsStr = funcStr.slice(0, equalIndex);
	} else {
		if (openBraceIndex + 1 === closeBraceIndex)
			argsStr = ""; // like function A() {}
		else argsStr = funcStr.slice(openBraceIndex + 1, closeBraceIndex);
	}
	const argsSplittedArray = splitArgsStrByCommas(argsStr);
	const args = argsSplittedArray.map((arg) => arg.trim()).filter((arg) => arg !== "");
	return {
		startPosition: openBraceIndex === -1 ? 0 : openBraceIndex,
		args,
	};
};

module.exports = getFunctionArgsNames;
module.exports.findCloseBraceIndex = findCloseBraceIndex;
module.exports.splitArgsStrByCommas = splitArgsStrByCommas;
