let assert;
import("chai").then((chai) => (assert = chai.assert));
const getClassConstructorArgsNames = require("../getClassConstructorArgsNames.js");

describe("getClassConstructorArgsNames", function () {
	describe("getClassConstructorArgsNames()", function () {
		it(`should throw an exception 'Argument cls with invalid type - undefined. Argument value type must be a class.'`, function () {
			const testFuncThrowsError = () => getClassConstructorArgsNames();
			assert.throws(testFuncThrowsError, Error, "Argument cls with invalid type - undefined. Argument value type must be a class.");
		});
	});

	describe("getClassConstructorArgsNames(function)", function () {
		it(`should throw an exception 'Argument cls with invalid type - function. Argument value type must be a string.'`, function () {
			function A() {}
			const testFuncThrowsError = () => getClassConstructorArgsNames(A);
			assert.throws(testFuncThrowsError, Error, "Argument cls with invalid type - function. Argument value type must be a class.");
		});
	});

	describe("getClassConstructorArgsNames(class without constructor())", function () {
		it(`should throw an exception 'DI object has no one constructor. Need one or more.'`, function () {
			class A {}
			const testFuncThrowsError = () => getClassConstructorArgsNames(A);
			assert.throws(testFuncThrowsError, Error, "DI object has no one constructor. Need one or more.");
		});
	});

	describe("getClassConstructorArgsNames(class with constructor())", function () {
		it(`should return {
                startPosition: 14,
                args: [],
            }`, function () {
			class A {
				constructor() {}
			}
			assert.deepEqual(getClassConstructorArgsNames(A), {
				startPosition: 14,
				args: [],
			});
		});
	});

	describe("getClassConstructorArgsNames(class with constructor(a, b, c))", function () {
		it(`should return {
                startPosition: 14,
                args: ['a', 'b', 'c'],
            }`, function () {
			class A {
				constructor(a, b, c) {}
			}
			assert.deepEqual(getClassConstructorArgsNames(A), {
				startPosition: 14,
				args: ["a", "b", "c"],
			});
		});
	});

	describe("getClassConstructorArgsNames(class with constructor(a = Abstract, b, c))", function () {
		it(`should return {
                startPosition: 14,
                args: ['a = Abstract', 'b', 'c'],
            }`, function () {
			class Abstract {
				constructor() {}
			}
			class A {
				constructor(a = Abstract, b, c) {}
			}
			assert.deepEqual(getClassConstructorArgsNames(A), {
				startPosition: 14,
				args: ["a = Abstract", "b", "c"],
			});
		});
	});

	describe("getClassConstructorArgsNames(class with constructor(a = () => (1), b, c))", function () {
		it(`should return {
                startPosition: 14,
                args: ['a = () => (1)', 'b', 'c'],
            }`, function () {
			class A {
				constructor(a = () => 1, b, c) {}
			}
			assert.deepEqual(getClassConstructorArgsNames(A), {
				startPosition: 14,
				args: ["a = () => 1", "b", "c"],
			});
		});
	});

	describe("getClassConstructorArgsNames(class with constructor(a = () => (() => (1)), b, c))", function () {
		it(`should return {
                startPosition: 14,
                args: ['a = () => (() => (1))', 'b', 'c'],
            }`, function () {
			class A {
				constructor(a = () => () => 1, b, c) {}
			}
			assert.deepEqual(getClassConstructorArgsNames(A), {
				startPosition: 14,
				args: ["a = () => () => 1", "b", "c"],
			});
		});
	});

	describe("getClassConstructorArgsNames(class with constructor(a = () => (() => ({ r: 1, t: 2 })), b, c))", function () {
		it(`should return {
                startPosition: 14,
                args: ['a = () => (() => ({ r: 1, t: 2 }))', 'b', 'c'],
            }`, function () {
			class A {
				constructor(a = () => () => ({ r: 1, t: 2 }), b, c) {}
			}
			assert.deepEqual(getClassConstructorArgsNames(A), {
				startPosition: 14,
				args: ["a = () => () => ({ r: 1, t: 2 })", "b", "c"],
			});
		});
	});
});
