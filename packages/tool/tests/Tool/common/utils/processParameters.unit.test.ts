import { PropertyType } from '@tool/common/enums';
import type { IParameterDefinition } from '@tool/common/interfaces';
import { expect, test, describe, beforeEach, afterEach } from 'bun:test';
import { processParameters } from '@tool/common/utils/processParameters';

describe('processParameters', () => {
	let testParameters: Record<string, IParameterDefinition>;
	const testParam1Description = 'Test parameter 1';
	const testParam2Description = 'Test parameter 2';
	const nestedParamDescription = 'Nested parameter';

	beforeEach(() => {
		// Setup test parameters
		testParameters = {};
	});

	afterEach(() => {
		// Clean up after each test
		testParameters = {};
	});

	describe('when no parameters are provided', () => {
		let processedParameters: Record<string, unknown>;

		beforeEach(() => {
			// Setup test parameters
			testParameters = {};

			// Process parameters
			processedParameters = processParameters({
				parameters: testParameters,
			});
		});

		test('should return empty object', () => {
			expect(processedParameters).toEqual({});
		});
	});

	describe('when processing simple parameters', () => {
		let processedParameters: Record<string, unknown>;

		beforeEach(() => {
			// Setup test parameters
			testParameters = {
				param1: {
					type: PropertyType.String,
					description: testParam1Description,
					required: true,
				},
				param2: {
					type: PropertyType.Number,
					description: testParam2Description,
					required: false,
				},
			};

			// Process parameters
			processedParameters = processParameters({
				parameters: testParameters,
			});
		});

		test('should return expected parameters', () => {
			expect(processedParameters).toEqual({
				param1: {
					type: PropertyType.String,
					description: testParam1Description,
				},
				param2: {
					type: PropertyType.Number,
					description: testParam2Description,
				},
			});
		});
	});

	describe('when processing parameters with enum', () => {
		let processedParameters: Record<string, unknown>;
		const enumValues = ['value1', 'value2'];

		beforeEach(() => {
			// Setup test parameters
			testParameters = {
				param1: {
					type: PropertyType.String,
					description: testParam1Description,
					required: true,
					enum: enumValues,
				},
			};

			// Process parameters
			processedParameters = processParameters({
				parameters: testParameters,
			});
		});

		test('should return expected parameters', () => {
			expect(processedParameters).toEqual({
				param1: {
					type: PropertyType.String,
					description: testParam1Description,
					enum: enumValues,
				},
			});
		});
	});

	describe('when processing nested object parameters', () => {
		let processedParameters: Record<string, unknown>;
		const objectParamDescription = 'Test object parameter';

		beforeEach(() => {
			// Setup test parameters
			testParameters = {
				param1: {
					type: PropertyType.Object,
					description: objectParamDescription,
					required: true,
					properties: {
						nestedParam: {
							type: PropertyType.String,
							description: nestedParamDescription,
							required: true,
						},
					},
				},
			};

			// Process parameters
			processedParameters = processParameters({
				parameters: testParameters,
			});
		});

		test('should return expected parameters', () => {
			expect(processedParameters).toEqual({
				param1: {
					type: PropertyType.Object,
					description: objectParamDescription,
					properties: {
						nestedParam: {
							type: PropertyType.String,
							description: nestedParamDescription,
						},
					},
				},
			});
		});
	});

	describe('when processing parameters with removeEnums flag', () => {
		let processedParameters: Record<string, unknown>;

		beforeEach(() => {
			testParameters = {
				param1: {
					type: PropertyType.String,
					description: 'Test parameter 1',
					enum: ['value1', 'value2'],
				},
			};

			processedParameters = processParameters({
				parameters: testParameters,
				removeEnums: true,
			});
		});

		test('should return expected parameters', () => {
			expect(processedParameters).toEqual({
				param1: {
					type: PropertyType.String,
					description: 'Test parameter 1',
				},
			});
		});
	});

	describe('when processing parameters with upperCasePropertyTypes flag', () => {
		let processedParameters: Record<string, unknown>;

		beforeEach(() => {
			testParameters = {
				param1: {
					type: PropertyType.String,
					description: 'Test parameter 1',
				},
				param2: {
					type: PropertyType.Object,
					description: 'Test parameter 2',
					properties: {
						nestedParam: {
							type: PropertyType.Number,
							description: 'Nested parameter',
						},
					},
				},
			};

			processedParameters = processParameters({
				parameters: testParameters,
				upperCasePropertyTypes: true,
			});
		});

		test('should return expected parameters', () => {
			expect(processedParameters).toEqual({
				param1: {
					type: PropertyType.String.toUpperCase(),
					description: 'Test parameter 1',
				},
				param2: {
					type: PropertyType.Object.toUpperCase(),
					description: 'Test parameter 2',
					properties: {
						nestedParam: {
							type: PropertyType.Number.toUpperCase(),
							description: 'Nested parameter',
						},
					},
				},
			});
		});
	});
});
