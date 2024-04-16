const getBaseClassConstructor = (cls) => {
    const constructor = cls.prototype.__proto__.constructor;
    if (constructor.name === 'Object') {
        return Object;
    }
    return constructor;
};

export default getBaseClassConstructor;
