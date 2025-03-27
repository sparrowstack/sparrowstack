import { ProviderName } from '@sparrowstack/core';
import { Name } from '@structured-output/common/enums';
import { expect, test, describe, beforeEach } from 'bun:test';
import { StructuredOutput } from '@structured-output/StructuredOutput';
import {
	mockZodResponseFormat,
	expectedOpenAIResponseFormat,
	expectedAnthropicResponseFormat,
	expectedGoogleGenerativeAIResponseFormat,
} from '@tests/mocks';

describe('StructuredOutput', () => {
	const name = 'structured-output';
	const strucuturedOutput = mockZodResponseFormat;
	let structuredOutput: StructuredOutput;

	describe('when instantiated with no name', () => {
		beforeEach(() => {
			structuredOutput = new StructuredOutput({
				strucuturedOutput,
			});
		});

		test('should have a name', () => {
			expect(structuredOutput.name).toBe(Name.Default);
		});
	});

	describe('when instantiated with a name', () => {
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
		beforeEach(() => {
			structuredOutput = new StructuredOutput({
				strucuturedOutput,
			});
		});

		let responseFormat: Record<string, any>;

		describe('OpenAI', () => {
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

		describe('Anthropic', () => {
			let responseFormat: Record<string, any>;
			beforeEach(() => {
				responseFormat = structuredOutput.getResponseFormat({
					providerName: ProviderName.Anthropic,
				});
			});

			test('should return the correct response format', () => {
				expect(responseFormat).toStrictEqual(
					expectedAnthropicResponseFormat,
				);
			});
		});

		describe('Google Generative AI', () => {
			let responseFormat: Record<string, any>;

			beforeEach(() => {
				responseFormat = structuredOutput.getResponseFormat({
					providerName: ProviderName.GoogleGenerativeAI,
				});
			});

			test('should return the correct response format', () => {
				expect(responseFormat).toStrictEqual(
					expectedGoogleGenerativeAIResponseFormat,
				);
			});
		});
	});
});
