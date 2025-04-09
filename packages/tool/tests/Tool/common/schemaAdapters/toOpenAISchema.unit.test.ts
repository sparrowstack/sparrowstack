import { PropertyType } from '@tool/common/enums';
import type { IToolSchemaParams } from '@tool/common/interfaces';
import { expect, test, describe, beforeEach, afterEach } from 'bun:test';
import { toOpenAISchema } from '@tool/common/schemaAdapters/toOpenAISchema';

describe('toOpenAISchema', () => {
	let toolSchema: IToolSchemaParams;

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
		let openAISchema: unknown;
		const toolName = 'testTool';
		const toolDescription = 'A test tool';

		beforeEach(() => {
			// Setup tool schema
			toolSchema = {
				name: toolName,
				description: toolDescription,
			};

			// Convert to OpenAI schema
			openAISchema = toOpenAISchema(toolSchema);
		});

		test('should return expected function schema', () => {
			expect(openAISchema).toEqual({
				type: 'function',
				name: toolName,
				description: toolDescription,
				parameters: {
					type: PropertyType.Object,
					properties: {},
					required: [],
					additionalProperties: false,
				},
				strict: true,
			});
		});
	});

	describe('when schema with parameters is provided', () => {
		let openAISchema: unknown;
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

			// Convert to OpenAI schema
			openAISchema = toOpenAISchema(toolSchema);
		});

		test('should return expected function schema', () => {
			expect(openAISchema).toEqual({
				type: 'function',
				name: toolName,
				description: toolDescription,
				parameters: {
					type: PropertyType.Object,
					properties: {
						param1: {
							type: PropertyType.String,
							description: parameter1Description,
						},
						param2: {
							type: PropertyType.Number,
							description: parameter2Description,
						},
					},
					required: ['param1'],
					additionalProperties: false,
				},
				strict: true,
			});
		});
	});

	describe('when schema with complex parameters is provided', () => {
		let openAISchema: unknown;
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

			// Convert to OpenAI schema
			openAISchema = toOpenAISchema(toolSchema);
		});

		test('should return expected function schema', () => {
			expect(openAISchema).toEqual({
				type: 'function',
				name: toolName,
				description: toolDescription,
				parameters: {
					type: PropertyType.Object,
					properties: {
						param1: {
							type: PropertyType.Object,
							description: parameter1Description,
							properties: {
								nestedParam: {
									type: PropertyType.String,
									description: nestedParameterDescription,
								},
							},
						},
						param2: {
							type: PropertyType.String,
							description: parameter2Description,
							enum: ['value1', 'value2'],
						},
					},
					required: ['param1', 'param2'],
					additionalProperties: false,
				},
				strict: true,
			});
		});
	});
});
