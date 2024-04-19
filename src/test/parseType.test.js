const chai = await import('chai');
const parseType = await import('../parseType.js').then(p => p.default);
const assert = chai.assert;

describe('parseType', function () {
    describe('parseType()', function () {
        it("should return undefined", function () {
            assert.equal(parseType(), 'undefined');
        });
    });

    describe('parseType(null)', function () {
        it("should return null", function () {
            assert.equal(parseType(null), 'null');
        });
    });

    describe('parseType(2)', function () {
        it("should return number", function () {
            assert.equal(parseType(1), 'number');
        });
    });

    describe("parseType('')", function () {
        it("should return string", function () {
            assert.equal(parseType(''), 'string');
        });
    });

    describe("parseType(true)", function () {
        it("should return boolean", function () {
            assert.equal(parseType(true), 'boolean');
        });
    });

    describe("parseType(Symbol(''))", function () {
        it("should return symbol", function () {
            assert.equal(parseType(Symbol('')), 'symbol');
        });
    });

    describe('parseType({ a: 1, b: 2 })', function () {
        it("should return object", function () {
            assert.equal(parseType({ a: 1, b: 2 }), 'object');
        });
    });

    describe('parseType(someClass)', function () {
        it("should return 'class'", function () {
            class A {
                constructor() { }
            }
            assert.equal(parseType(A), 'class');
        });
    });

    describe('parseType(someFunction)', function () {
        it("should return 'function'", function () {
            function A() { }
            assert.equal(parseType(A), 'function');
        });
    });
});
