const parseType = require("./parseType.js");

class ClassInvalidType extends Error {
	constructor(argType) {
		const message = `Argument 'cls' of getBaseClass(cls) has invalid type - ${argType}. Argument type must be a class or a function.`;
		super(message);
	}
}

const getBaseClassConstructor = (cls) => {
	const clsType = parseType(cls);
	if (clsType !== "class" && clsType !== "function") throw new ClassInvalidType(clsType);
	const constructor = clsType === "class" ? cls.prototype.__proto__.constructor : cls.prototype;
	return constructor;
};

module.exports = getBaseClassConstructor;
