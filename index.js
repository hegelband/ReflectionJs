const argDefaultValue = require("./src/getArgumentDefaultValue.js");
const getBaseClassConstructor = require("./src/getBaseClassConstructor.js");
const classConstructorArgsNames = require("./src/getClassConstructorArgsNames.js");
const functionArgsNames = require("./src/getFunctionArgsNames.js");
const getType = require("./src/parseType.js");

module.exports.getArgumentDefaultValue = argDefaultValue;
module.exports.getClassConstructorArgsNames = classConstructorArgsNames;
module.exports.getFunctionArgsNames = functionArgsNames;
module.exports.parseType = getType;
module.exports.getBaseClass = getBaseClassConstructor;
