import argDefaultValue from "./src/getArgumentDefaultValue.js";
import getBaseClassConstructor from "./src/getBaseClassConstructor.js";
import classConstructorArgsNames from "./src/getClassConstructorArgsNames.js";
import functionArgsNames from "./src/getFunctionArgsNames.js";
import getType from "./src/parseType.js";

export const getArgumentDefaultValue = argDefaultValue;
export const getClassConstructorArgsNames = classConstructorArgsNames;
export const getFunctionArgsNames = functionArgsNames;
export const parseType = getType;
export const getBaseClass = getBaseClassConstructor;
