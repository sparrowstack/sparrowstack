import { expect, test, describe, beforeEach } from 'bun:test';
import { ProviderName } from '@sparrowstack/core';
import { StructuredOutput } from '@structured-output/StructuredOutput';
import {
	mockZodResponseFormat,
	expectedOpenAIResponseFormat,
} from '@tests/mocks';

describe('StructuredOutput', () => {
	const name = 'testResponseFormat';
	const strucuturedOutput = mockZodResponseFormat;
	let structuredOutput: StructuredOutput;

	describe('when instantiated', () => {
		beforeEach(() => {
			structuredOutput = new StructuredOutput({
				name,
				strucuturedOutput,
			});
		});

		test('is a class', () => {
			expect(structuredOutput).toBeInstanceOf(StructuredOutput);
		});

		test('should have a name', () => {
			expect(structuredOutput.name).toBe(name);
		});

		test('should have a strucuturedOutput', () => {
			expect(structuredOutput.strucuturedOutput).toStrictEqual(
				strucuturedOutput,
			);
		});

		test('should have a getResponseFormat method', () => {
			expect(structuredOutput.getResponseFormat).toBeInstanceOf(Function);
		});
	});

	describe('when getResponseFormat is called', () => {
		let responseFormat: Record<string, any>;
		beforeEach(() => {
			responseFormat = structuredOutput.getResponseFormat({
				providerName: ProviderName.OpenAI,
			});
		});

		test('should return the correct response format', () => {
			expect(responseFormat).toStrictEqual(
				expect.objectContaining(expectedOpenAIResponseFormat),
			);
		});
	});
});
