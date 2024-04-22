const chai = await import('chai');
const getStringifiedEntityName = await import('../getStringifiedEntityName.js').then(p => p.default);
const assert = chai.assert;

describe('getArgumentDefaultValue', function () {
    describe('getStringifiedEntityName()', function () {
        it(
            `should throw an exception 'getStringifiedEntityName argument type is invalid (undefined - undefined). 'entityStr' must be a string.'`,
            function () {
                const testFuncThrowsError = () => getStringifiedEntityName();
                assert.throws(
                    testFuncThrowsError,
                    Error,
                    `getStringifiedEntityName argument type is invalid (undefined - undefined). 'entityStr' must be a string.`
                );
            }
        );
    });

    describe("getStringifiedEntityName('')", function () {
        it(
            `should throw an exception 'getStringifiedEntityName argument is an empty string.`,
            function () {
                const testFuncThrowsError = () => getStringifiedEntityName('');
                assert.throws(
                    testFuncThrowsError,
                    Error,
                    `getStringifiedEntityName argument is an empty string.`
                );
            }
        );
    });

    describe('getStringifiedEntityName(simple entity name)', function () {
        it(
            `should return Entity`,
            function () {
                assert.deepEqual(getStringifiedEntityName('Entity'), 'Entity');
            }
        );
    });

    describe(`Webpack module: getStringifiedEntityName('_Entity__WEBPACK_IMPORTED_MODULE_0__["default"]')`, function () {
        it(
            `should return 'Entity'`,
            function () {
                assert.deepEqual(getStringifiedEntityName('_Entity__WEBPACK_IMPORTED_MODULE_0__["default"]'), 'Entity');
            }
        );
    });
});
