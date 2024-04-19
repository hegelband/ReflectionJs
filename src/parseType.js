function parseType(data) {
    const type = typeof data;
    if (type !== 'function') {
        if (type === 'object' && data === null) return 'null';
        return type;
    };
    const typeStr = data.toString();
    return typeStr.startsWith('class') ? 'class' : 'function';
}

export default parseType;
