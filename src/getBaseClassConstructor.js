const parseType = require("./parseType.js");

/** Class representing an error thrown when getBaseClassConstructor arg type isn't a class or function.
 * @class
 * @extends Error
 */
class ClassInvalidType extends Error {
	/**
	 *
	 * @param {string} argType - getBaseClassConstructor `cls` arg type
	 */
	constructor(argType) {
		const message = `Argument 'cls' of getBaseClass(cls) has invalid type - ${argType}. Argument type must be a class or a function.`;
		super(message);
	}
}

/** Returns constructor of `cls`
 *
 * @param {function} cls - class
 * @returns {function}
 */
const getBaseClassConstructor = (cls) => {
	const clsType = parseType(cls);
	if (clsType !== "class" && clsType !== "function") throw new ClassInvalidType(clsType);
	const constructor = clsType === "class" ? cls.prototype.__proto__.constructor : cls.prototype;
	return constructor;
};

module.exports = getBaseClassConstructor;
