import parseType from "./parseType.js";

class FuncArgumentInvalidType extends Error {
    constructor(funcType) {
        const message = `Argument func with invalid type - ${funcType}. Argument value type must be a function.`;
        super(message);
    }
}

const getFunctionArgsNames = func => {
    const funcType = parseType(func);
    if (funcType !== 'function') throw new FuncArgumentInvalidType(funcType);
    const funcStr = func.toString();
    const openBraceIndex = funcStr.indexOf('(', 0);
    const closeBraceIndex = funcStr.indexOf(')', openBraceIndex);
    const equalIndex = funcStr.indexOf('=');
    // functions with one argument without braces around:
    // argName => {};
    // argName => doSth(argName);
    const oneArgWithoutBraces = equalIndex !== -1 && (openBraceIndex === -1 || equalIndex < openBraceIndex);
    let argsStr;
    if (oneArgWithoutBraces) {
        argsStr = funcStr.slice(0, equalIndex);
    } else {
        if (openBraceIndex + 1 === closeBraceIndex) argsStr = ''; // like function A() {}
        else argsStr = funcStr.slice(openBraceIndex + 1, closeBraceIndex);

    }
    const args = argsStr.split(',').map(arg => arg.trim()).filter(arg => arg !== '');
    return {
        startPosition: openBraceIndex === -1 ? 0 : openBraceIndex,
        args,
    };

}

export default getFunctionArgsNames;