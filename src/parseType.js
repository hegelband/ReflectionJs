function parseType(data) {
    const type = typeof data;
    if (type !== 'function') {
        if (type === 'object' && data === null) return 'null';
        return type;
    };
    const typeStr = data.toString();
    if (typeStr.startsWith('class')) {
        return 'class';
    } else if (typeStr.includes('_classCallCheck')) {
        return 'function class';
    } else {
        return 'function';
    }
}

module.exports = parseType;
