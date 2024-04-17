const getStringifiedEntityName = (entityStr) => {
    if (entityStr.includes('WEBPACK_IMPORTED_MODULE')) {
        const startIndex = entityStr.indexOf('_') + 1;
        const endIndex = entityStr.indexOf('_', startIndex + 1);
        return entityStr.slice(startIndex, endIndex);
    }
    return entityStr;
};

export default getStringifiedEntityName;
