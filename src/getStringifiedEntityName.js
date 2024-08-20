const parseType = require("./parseType.js");

/** Class representing an error thrown when getStringifiedEntityName `entityStr` arg type isn't a string.
 * @class
 * @extends Error
 */
class EntityStrInvalidType extends Error {
	/**
	 *
	 * @param {any} entityStr
	 * @param {string} entityStrType
	 */
	constructor(entityStr, entityStrType) {
		super(`getStringifiedEntityName argument type is invalid (${entityStr} - ${entityStrType}). 'entityStr' must be a string.`);
	}
}

/** Class representing an error thrown when getStringifiedEntityName `entityStr` arg is an empty string.
 * @class
 * @extends Error
 */
class EntityStrIsEmpty extends Error {
	constructor() {
		super(`getStringifiedEntityName argument is an empty string.`);
	}
}

/** Returns name of entity.toString result
 *
 * @param {string} entityStr
 * @returns {string}
 */
const getStringifiedEntityName = (entityStr) => {
	const entityStrType = parseType(entityStr);
	if (entityStrType !== "string") throw new EntityStrInvalidType(entityStr, entityStrType);
	if (entityStr === "") throw new EntityStrIsEmpty();
	if (entityStr.includes("WEBPACK_IMPORTED_MODULE")) {
		const startIndex = entityStr.indexOf("_") + 1;
		const endIndex = entityStr.indexOf("_", startIndex + 1);
		return entityStr.slice(startIndex, endIndex);
	}
	return entityStr;
};

module.exports = getStringifiedEntityName;
