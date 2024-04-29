import { assert } from 'chai';
import getFunctionArgsNames from '../getFunctionArgsNames.js';

describe('getFunctionArgsNames', function () {
    describe('getFunctionArgsNames()', function () {
        it(
            `should throw an exception 'Argument func with invalid type - undefined. Argument value type must be a function.'`,
            function () {
                const testFuncThrowsError = () => getFunctionArgsNames();
                assert.throws(
                    testFuncThrowsError,
                    Error,
                    'Argument func with invalid type - undefined. Argument value type must be a function.'
                );
            }
        );
    });

    describe('getFunctionArgsNames(function without args)', function () {
        it(
            `should return {
                startPosition: 10,
                args: [],
            }`,
            function () {
                function A() {

                }
                assert.deepEqual(getFunctionArgsNames(A), {
                    startPosition: 10,
                    args: [],
                });
            }
        );
    });

    describe('Function Declaration: getFunctionArgsNames(function (a, b, c) {})', function () {
        it(
            `should return {
                startPosition: 10,
                args: ['a', 'b', 'c'],
            }`,
            function () {
                function A(a, b, c) {

                }
                assert.deepEqual(getFunctionArgsNames(A), {
                    startPosition: 10,
                    args: ['a', 'b', 'c'],
                });
            }
        );
    });

    describe('Function Expression with arrow function: getFunctionArgsNames(const A = (a, b, c) => {})', function () {
        it(
            `should return {
                startPosition: 0,
                args: ['a', 'b', 'c'],
            }`,
            function () {
                const A = (a, b, c) => {

                }
                assert.deepEqual(getFunctionArgsNames(A), {
                    startPosition: 0,
                    args: ['a', 'b', 'c'],
                });
            }
        );
    });

    describe('Arrow Function with one argument without braces around: getFunctionArgsNames(const A = b => {})', function () {
        it(
            `should return {
                startPosition: 0,
                args: ['b'],
            }`,
            function () {
                const A = b => {

                }
                assert.deepEqual(getFunctionArgsNames(A), {
                    startPosition: 0,
                    args: ['b'],
                });
            }
        );
    });

    describe('Argument with default value: getFunctionArgsNames(const A = (a = Entity, b, c) => {})', function () {
        it(
            `should return {
                startPosition: 0,
                args: ['a = Entity', 'b', 'c'],
            }`,
            function () {
                class Entity { }
                const A = (a = Entity, b, c) => {

                }
                assert.deepEqual(getFunctionArgsNames(A), {
                    startPosition: 0,
                    args: ['a = Entity', 'b', 'c'],
                });
            }
        );
    });

    describe('Argument with default value: getFunctionArgsNames(const A = (a = () => Entity, b, c) => {})', function () {
        it(
            `should return {
                startPosition: 0,
                args: ['a = () => Entity', 'b', 'c'],
            }`,
            function () {
                class Entity { }
                const A = (a = () => Entity, b, c) => {

                }
                assert.deepEqual(getFunctionArgsNames(A), {
                    startPosition: 0,
                    args: ['a = () => Entity', 'b', 'c'],
                });
            }
        );
    });

    describe('Argument with default value: getFunctionArgsNames(const A = (a = () => (() => Entity), b, c) => {})', function () {
        it(
            `should return {
                startPosition: 0,
                args: ['a = () => (() => Entity)', 'b', 'c'],
            }`,
            function () {
                class Entity { }
                const A = (a = () => (() => Entity), b, c) => {

                }
                assert.deepEqual(getFunctionArgsNames(A), {
                    startPosition: 0,
                    args: ['a = () => (() => Entity)', 'b', 'c'],
                });
            }
        );
    });

    describe('Argument with default value: getFunctionArgsNames(const A = (a = () => (() => ({ r: 1, t: 2 })), b, c) => {})', function () {
        it(
            `should return {
                startPosition: 0,
                args: ['a = () => (() => ({ r: 1, t: 2 }))', 'b', 'c'],
            }`,
            function () {
                class Entity { }
                const A = (a = () => (() => ({ r: 1, t: 2 })), b, c) => {

                }
                assert.deepEqual(getFunctionArgsNames(A), {
                    startPosition: 0,
                    args: ['a = () => (() => ({ r: 1, t: 2 }))', 'b', 'c'],
                });
            }
        );
    });
});
