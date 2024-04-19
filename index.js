import argDefaultValue from "./src/getArgumentDefaultValue.js";
import getBaseClassConstructor from "./src/getBaseClassConstructor.js";
import classConstructorArgsNames from "./src/getClassConstructorArgsNames.js";
import functionArgsNames from "./src/getFunctionArgsNames.js";
import moduleImports from "./src/getModuleImports.js";
import getType from "./src/parseType.js";

export const getArgumentDefaultValue = argDefaultValue;
export const getClassConstructorArgsNames = classConstructorArgsNames;
export const getFunctionArgsNames = functionArgsNames;
export const getModuleImports = moduleImports;
export const parseType = getType;
export const getBaseClass = getBaseClassConstructor;

export default {
    getArgumentDefaultValue,
    getClassConstructorArgsNames,
    getFunctionArgsNames,
    getModuleImports,
    parseType,
    getBaseClass,
};