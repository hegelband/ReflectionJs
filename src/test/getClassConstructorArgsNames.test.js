const chai = await import('chai');
const getClassConstructorArgsNames = await import('../getClassConstructorArgsNames.js').then(p => p.default);
const assert = chai.assert;

describe('getClassConstructorArgsNames', function () {
    describe('getClassConstructorArgsNames()', function () {
        it(`should throw an exception 'Argument clsStr with invalid type. Argument value type must be a string.'`,
            function () {
                function A() { }
                const testFuncThrowsError = () => getClassConstructorArgsNames();
                assert.throws(testFuncThrowsError, Error, 'Argument clsStr with invalid type. Argument value type must be a string.');
            }
        );
    });

    describe('getClassConstructorArgsNames(function)', function () {
        it(`should throw an exception 'Argument clsStr with invalid type. Argument value type must be a string.'`,
            function () {
                function A() { }
                const testFuncThrowsError = () => getClassConstructorArgsNames(A);
                assert.throws(testFuncThrowsError, Error, 'Argument clsStr with invalid type. Argument value type must be a string.');
            }
        );
    });

    describe('getClassConstructorArgsNames(class with constructor())', function () {
        it(`should return {
                startPosition: 30,
                args: [],
            }`,
            function () {
                class A {
                    constructor() { }
                }
                assert.deepEqual(getClassConstructorArgsNames(A), {
                    startPosition: 30,
                    args: [],
                });
            }
        );
    });

    describe('getClassConstructorArgsNames(class with constructor(a, b, c))', function () {
        it(`should return {
                startPosition: 30,
                args: ['a', 'b', 'c'],
            }`,
            function () {
                class A {
                    constructor(a, b, c) { }
                }
                assert.deepEqual(getClassConstructorArgsNames(A), {
                    startPosition: 30,
                    args: ['a', 'b', 'c'],
                });
            }
        );
    });

    describe('getClassConstructorArgsNames(class with constructor(a = Abstract, b, c))', function () {
        it(`should return {
                startPosition: 30,
                args: ['a = Abstract', 'b', 'c'],
            }`,
            function () {
                class Abstract {
                    constructor() { }
                }
                class A {
                    constructor(a = Abstract, b, c) { }
                }
                assert.deepEqual(getClassConstructorArgsNames(A), {
                    startPosition: 30,
                    args: ['a = Abstract', 'b', 'c'],
                });
            }
        );
    });
});