import { expect, test, describe, beforeEach, afterEach } from 'bun:test';

describe('sample unit test', () => {
	let expectedValue: boolean;

	beforeEach(() => {
		expectedValue = true;
	});

	afterEach(() => {
		expectedValue = false;
	});

	test('should return true', () => {
		expect(expectedValue).toEqual(true);
	});
});
