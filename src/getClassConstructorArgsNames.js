import parseType from "./parseType.js";

class HasNoConstructorError extends Error {
    constructor() {
        const message = 'DI object has no one constructor. Need one or more.';
        super(message);
    }
}

class ClsArgumentInvalidType extends Error {
    constructor(clsType) {
        const message = `Argument cls with invalid type - ${clsType}. Argument value type must be a class.`;
        super(message);
    }
}

const getClassConstructorArgsNames = cls => {
    const clsType = parseType(cls);
    if (clsType !== 'class') throw new ClsArgumentInvalidType(clsType);
    const clsStr = cls.toString();
    const separator = 'constructor';
    const startIndex = clsStr.indexOf(separator, 0);
    if (startIndex === -1) {
        throw new HasNoConstructorError();
    }
    const openBraceStartIndex = clsStr.indexOf('(', startIndex);
    const closeBraceStartIndex = clsStr.indexOf(')', openBraceStartIndex);
    const argsStr = clsStr.slice(openBraceStartIndex + 1, closeBraceStartIndex);
    const args = argsStr.split(',').map(arg => arg.trim()).filter(arg => arg !== '');
    return {
        startPosition: startIndex,
        args,
    };

}

export default getClassConstructorArgsNames;