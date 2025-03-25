import { ProviderName } from '@sparrowstack/core';
import { expect, test, describe, beforeEach } from 'bun:test';
import { getResponseFormat } from '@structured-output/methods';
import {
	mockZodResponseFormat,
	expectedOpenAIResponseFormat,
	expectedAnthropicResponseFormat,
	expectedGoogleGenerativeAIResponseFormat,
} from '@tests/mocks';

describe('getResponseFormat', () => {
	let responseFormat: Record<string, any>;

	test('is a function', () => {
		expect(getResponseFormat).toBeInstanceOf(Function);
	});

	describe('when provided a providerName', () => {
		describe('OpenAI', () => {
			beforeEach(() => {
				responseFormat = getResponseFormat({
					providerName: ProviderName.OpenAI,
					name: 'testResponseFormat',
					zodObject: mockZodResponseFormat,
				});
			});

			test('should return the correct response format', () => {
				expect(responseFormat).toStrictEqual(
					expect.objectContaining(expectedOpenAIResponseFormat),
				);
			});
		});

		describe('Anthropic', () => {
			beforeEach(() => {
				responseFormat = getResponseFormat({
					providerName: ProviderName.Anthropic,
					name: 'testResponseFormat',
					zodObject: mockZodResponseFormat,
				});
			});

			test('should return the correct response format', () => {
				expect(responseFormat).toStrictEqual(
					expect.objectContaining(expectedAnthropicResponseFormat),
				);
			});
		});

		describe('Google Generative AI', () => {
			beforeEach(() => {
				responseFormat = getResponseFormat({
					providerName: ProviderName.GoogleGenerativeAI,
					name: 'testResponseFormat',
					zodObject: mockZodResponseFormat,
				});
			});

			test('should return the correct response format', () => {
				expect(responseFormat).toStrictEqual(
					expect.objectContaining(
						expectedGoogleGenerativeAIResponseFormat,
					),
				);
			});
		});
	});
});
