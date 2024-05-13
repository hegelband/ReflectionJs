const parseType = require("./parseType.js");

class EntityStrInvalidType extends Error {
  constructor(entityStr, entityStrType) {
    super(
      `getStringifiedEntityName argument type is invalid (${entityStr} - ${entityStrType}). 'entityStr' must be a string.`,
    );
  }
}

class EntityStrIsEmpty extends Error {
  constructor() {
    super(`getStringifiedEntityName argument is an empty string.`);
  }
}

const getStringifiedEntityName = (entityStr) => {
  const entityStrType = parseType(entityStr);
  if (entityStrType !== "string")
    throw new EntityStrInvalidType(entityStr, entityStrType);
  if (entityStr === "") throw new EntityStrIsEmpty();
  if (entityStr.includes("WEBPACK_IMPORTED_MODULE")) {
    const startIndex = entityStr.indexOf("_") + 1;
    const endIndex = entityStr.indexOf("_", startIndex + 1);
    return entityStr.slice(startIndex, endIndex);
  }
  return entityStr;
};

module.exports = getStringifiedEntityName;
