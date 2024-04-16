const getBaseClassConstructor = (cls) => {
    const constructor = cls.prototype.__proto__.constructor;
    return constructor;
};

export default getBaseClassConstructor;
