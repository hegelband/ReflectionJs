const chai = await import('chai');
const getArgumentDefaultValue = await import('../getArgumentDefaultValue.js').then(p => p.default);
const assert = chai.assert;

describe('getArgumentDefaultValue', function () {
    describe('getArgumentDefaultValue()', function () {
        it(
            `should throw an exception 'Argument 'arg' of getArgumentDefaultValue(arg) has invalid type - undefined. Argument type must be a string.'`,
            function () {
                const testFuncThrowsError = () => getArgumentDefaultValue();
                assert.throws(
                    testFuncThrowsError,
                    Error,
                    `Argument 'arg' of getArgumentDefaultValue(arg) has invalid type - undefined. Argument type must be a string.`
                );
            }
        );
    });

    describe("getArgumentDefaultValue('')", function () {
        it(
            `should throw an exception 'Argument 'arg' is an empty string.'`,
            function () {
                const testFuncThrowsError = () => getArgumentDefaultValue('');
                assert.throws(
                    testFuncThrowsError,
                    Error,
                    `Argument 'arg' is an empty string.`
                );
            }
        );
    });

    describe('getArgumentDefaultValue(argument without default value)', function () {
        it(
            `should return {
                name: 'testArg',
                value: undefined
            }`,
            function () {
                assert.deepEqual(getArgumentDefaultValue('testArg'), {
                    name: 'testArg',
                    value: undefined,
                });
            }
        );
    });

    describe("Argument with valid default value: getArgumentDefaultValue('a = TestEntity')", function () {
        it(
            `should return {
                name: 'a',
                value: 'TestEntity'
            }`,
            function () {
                assert.deepEqual(getArgumentDefaultValue('a = TestEntity'), {
                    name: 'a',
                    value: 'TestEntity',
                });
            }
        );
    });
});
