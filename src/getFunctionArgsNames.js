const getFunctionArgsNames = funcStr => {
    const openBraceStartIndex = funcStr.indexOf('(', 0);
    const closeBraceStartIndex = funcStr.indexOf(')', openBraceStartIndex);
    const oneArgWithoutBraces = funcStr.indexOf('=') < openBraceStartIndex;
    const argsStr = oneArgWithoutBraces
        ? funcStr.slice(0, funcStr.indexOf('='))
        : funcStr.slice(openBraceStartIndex + 1, closeBraceStartIndex);
    const args = argsStr.split(',').map(arg => arg.trim()).filter(arg => arg !== '');
    return {
        startPosition: openBraceStartIndex,
        args,
    };

}

export default getFunctionArgsNames;