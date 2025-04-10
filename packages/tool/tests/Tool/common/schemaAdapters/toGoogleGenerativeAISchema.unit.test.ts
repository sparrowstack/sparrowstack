import { PropertyType } from '@tool/common/enums';
import type { ToolSchemaParams } from '@tool/common/interfaces';
import { expect, test, describe, beforeEach, afterEach } from 'bun:test';
import { toGoogleGenerativeAI } from '@tool/common/schemaAdapters/toGoogleGenerativeAISchema';

describe('toGoogleGenerativeAISchema', () => {
	let toolSchema: ToolSchemaParams;

	beforeEach(() => {
		// Setup tool schema
		toolSchema = {
			name: '',
			description: '',
			parameters: {},
		};
	});

	afterEach(() => {
		// Clean up after each test
		toolSchema = {
			name: '',
			description: '',
			parameters: {},
		};
	});

	describe('when a minimal tool schema is provided', () => {
		let googleSchema: unknown;
		const toolName = 'testTool';
		const toolDescription = 'A test tool';

		beforeEach(() => {
			// Setup tool schema
			toolSchema = {
				name: toolName,
				description: toolDescription,
			};

			// Convert to Google schema
			googleSchema = toGoogleGenerativeAI(toolSchema);
		});

		test('should return expected tool schema', () => {
			expect(googleSchema).toEqual({
				functionDeclarations: [
					{
						name: toolName,
						description: toolDescription,
					},
				],
			});
		});
	});

	describe('when schema with parameters is provided', () => {
		let googleSchema: unknown;
		const toolName = 'testTool';
		const toolDescription = 'A test tool';
		const parameter1Description = 'Test parameter 1';
		const parameter2Description = 'Test parameter 2';

		beforeEach(() => {
			// Setup tool schema
			toolSchema = {
				name: toolName,
				description: toolDescription,
				parameters: {
					param1: {
						type: PropertyType.String,
						description: parameter1Description,
						required: true,
					},
					param2: {
						type: PropertyType.Number,
						description: parameter2Description,
						required: false,
					},
				},
			};

			// Convert to Google schema
			googleSchema = toGoogleGenerativeAI(toolSchema);
		});

		test('should return expected tool schema', () => {
			expect(googleSchema).toEqual({
				functionDeclarations: [
					{
						name: toolName,
						description: toolDescription,
						parameters: {
							type: PropertyType.Object.toUpperCase(),
							properties: {
								param1: {
									type: PropertyType.String.toUpperCase(),
									description: parameter1Description,
								},
								param2: {
									type: 'NUMBER',
									description: parameter2Description,
								},
							},
							required: ['param1'],
						},
					},
				],
			});
		});
	});

	describe('when schema with complex parameters is provided', () => {
		let googleSchema: unknown;
		const toolName = 'testTool';
		const toolDescription = 'A test tool';
		const parameter1Description = 'Test object parameter';
		const parameter2Description = 'Enum parameter';
		const nestedParameterDescription = 'Nested parameter';

		beforeEach(() => {
			// Setup tool schema
			toolSchema = {
				name: toolName,
				description: toolDescription,
				parameters: {
					param1: {
						type: PropertyType.Object,
						description: parameter1Description,
						required: true,
						properties: {
							nestedParam: {
								type: PropertyType.String,
								description: nestedParameterDescription,
								required: true,
							},
						},
					},
					param2: {
						type: PropertyType.String,
						description: parameter2Description,
						required: true,
						enum: ['value1', 'value2'],
					},
				},
			};

			// Convert to Google schema
			googleSchema = toGoogleGenerativeAI(toolSchema);
		});

		test('should return expected tool schema', () => {
			expect(googleSchema).toEqual({
				functionDeclarations: [
					{
						name: toolName,
						description: toolDescription,
						parameters: {
							type: PropertyType.Object.toUpperCase(),
							properties: {
								param1: {
									type: PropertyType.Object.toUpperCase(),
									description: parameter1Description,
									properties: {
										nestedParam: {
											type: PropertyType.String.toUpperCase(),
											description:
												nestedParameterDescription,
										},
									},
								},
								param2: {
									type: PropertyType.String.toUpperCase(),
									description: parameter2Description,
								},
							},
							required: ['param1', 'param2'],
						},
					},
				],
			});
		});
	});
});
