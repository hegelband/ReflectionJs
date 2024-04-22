const chai = await import('chai');
const getBaseClassConstructor = await import('../getBaseClassConstructor.js').then(p => p.default);
const assert = chai.assert;

describe('getBaseClassConstructor', function () {
    describe('getBaseClassConstructor()', function () {
        it(
            `should throw an exception 'Argument 'cls' of getBaseClass(cls) has invalid type - undefined. Argument type must be a class or a function.'`,
            function () {
                const testFuncThrowsError = () => getBaseClassConstructor();
                assert.throws(
                    testFuncThrowsError,
                    Error,
                    `Argument 'cls' of getBaseClass(cls) has invalid type - undefined. Argument type must be a class or a function.`
                );
            }
        );
    });

    describe("getBaseClassConstructor(class that's not inheritance of other user class)", function () {
        it(
            `should return undefined`,
            function () {
                class A {
                    constructor() { }
                }
                assert.deepEqual(getBaseClassConstructor(A), Object);
            }
        );
    });

    describe("getBaseClassConstructor(class inherited of another class)", function () {
        it(
            `should return A`,
            function () {
                class A {
                    constructor() { }
                }
                class B extends A {
                    constructor() {
                        super(A);
                    }
                }
                assert.deepEqual(getBaseClassConstructor(B), A);
            }
        );
    });

    describe("getBaseClassConstructor(constructor function with prototype (another constructor function))", function () {
        it(
            `should return A`,
            function () {
                function A() {
                    this.a = 1;
                }
                function B() {
                    this.b = 2;
                }
                B.prototype = A;
                assert.deepEqual(getBaseClassConstructor(B), A);
            }
        );
    });

    // describe('getBaseClassConstructor(argument without default value)', function () {
    //     it(
    //         `should return {
    //             name: 'testArg',
    //             value: undefined
    //         }`,
    //         function () {
    //             assert.deepEqual(getArgumentDefaultValue('testArg'), {
    //                 name: 'testArg',
    //                 value: undefined,
    //             });
    //         }
    //     );
    // });

    // describe("Argument with valid default value: getBaseClassConstructor('a = TestEntity')", function () {
    //     it(
    //         `should return {
    //             name: 'a',
    //             value: 'TestEntity'
    //         }`,
    //         function () {
    //             assert.deepEqual(getArgumentDefaultValue('a = TestEntity'), {
    //                 name: 'a',
    //                 value: 'TestEntity',
    //             });
    //         }
    //     );
    // });
});
