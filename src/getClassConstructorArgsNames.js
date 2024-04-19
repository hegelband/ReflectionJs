import parseType from "./parseType.js";

class HasNoConstructorError extends Error {
    constructor() {
        const message = 'DI object has no one constructor. Need one or more.';
        super(message);
    }
}

class ClsStrInvalidType extends Error {
    constructor(cls) {
        const message = 'Argument clsStr with invalid type. Argument value type must be a string.';
        super(message);
    }
}

const getClassConstructorArgsNames = cls => {
    if (parseType(cls) !== 'class') throw new ClsStrInvalidType(cls);
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