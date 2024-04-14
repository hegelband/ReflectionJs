import argDefaultValue from "./src/getArgumentDefaultValue";
import classConstructorArgsNames from "./src/getClassConstructorArgsNames";
import functionArgsNames from "./src/getFunctionArgsNames";
import moduleImports from "./src/getModuleImports";
import getType from "./src/parseType";

export const getArgumentDefaultValue = argDefaultValue;
export const getClassConstructorArgsNames = classConstructorArgsNames;
export const getFunctionArgsNames = functionArgsNames;
export const getModuleImports = moduleImports;
export const parseType = getType;

export default {
    getArgumentDefaultValue,
    getClassConstructorArgsNames,
    getFunctionArgsNames,
    getModuleImports,
    parseType,
};