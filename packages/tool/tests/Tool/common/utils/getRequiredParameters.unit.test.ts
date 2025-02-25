import { PropertyType } from '@tool/common/enums';
import type { IParameterDefinition } from '@tool/common/interfaces';
import { expect, test, describe, beforeEach, afterEach } from 'bun:test';
import { getRequiredParameters } from '@tool/common/utils/getRequiredParameters';

describe('getRequiredParameters', () => {
	let testParameters: Record<string, IParameterDefinition>;

	beforeEach(() => {
		// Setup test parameters
		testParameters = {};
	});

	afterEach(() => {
		// Clean up after each test
		testParameters = {};
	});

	describe('when no parameters are provided', () => {
		let requiredParameters: string[];

		beforeEach(() => {
			// Setup test parameters
			testParameters = {};

			// Get required parameters
			requiredParameters = getRequiredParameters({
				parameters: testParameters,
			});
		});

		test('should return empty array ', () => {
			expect(requiredParameters).toEqual([]);
		});
	});

	describe('when no required parameters exist', () => {
		let requiredParameters: string[];

		beforeEach(() => {
			// Setup test parameters
			testParameters = {
				param1: {
					required: false,
					type: PropertyType.String,
					description: 'Test parameter 1',
				},
				param2: {
					required: false,
					type: PropertyType.String,
					description: 'Test parameter 2',
				},
			};

			// Get required parameters
			requiredParameters = getRequiredParameters({
				parameters: testParameters,
			});
		});

		test('should return empty array', () => {
			expect(requiredParameters).toEqual([]);
		});
	});

	describe('when both required and optional parameters exist', () => {
		let requiredParameters: string[];

		beforeEach(() => {
			// Setup test parameters
			testParameters = {
				param1: {
					required: true,
					type: PropertyType.String,
					description: 'Test parameter 1',
				},
				param2: {
					required: false,
					type: PropertyType.String,
					description: 'Test parameter 2',
				},
				param3: {
					required: true,
					type: PropertyType.String,
					description: 'Test parameter 3',
				},
			};

			// Get required parameters
			requiredParameters = getRequiredParameters({
				parameters: testParameters,
			});
		});

		test('should return array of required parameter names', () => {
			expect(requiredParameters).toEqual(['param1', 'param3']);
		});
	});

	describe('when only required parameters exist', () => {
		let requiredParameters: string[];

		beforeEach(() => {
			// Setup test parameters
			testParameters = {
				param1: {
					required: true,
					type: PropertyType.String,
					description: 'Test parameter 1',
				},
				param2: {
					required: true,
					type: PropertyType.String,
					description: 'Test parameter 2',
				},
				param3: {
					required: true,
					type: PropertyType.String,
					description: 'Test parameter 3',
				},
			};

			// Get required parameters
			requiredParameters = getRequiredParameters({
				parameters: testParameters,
			});
		});

		test('should return array of required parameter names', () => {
			expect(requiredParameters).toEqual(['param1', 'param2', 'param3']);
		});
	});
});
