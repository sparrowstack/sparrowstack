import { expect, test, describe, beforeEach } from 'bun:test';
import {
	mockZodResponseFormat,
	expectedOpenAIResponseFormat,
} from '@tests/mocks';
import { zodToOpenAIResponseFormatAdapter } from '@structured-output/common/responseFormatAdapters/zod';

describe('zodToOpenAIResponseFormatAdapter', () => {
	describe('when provided a Zod responseFormat', () => {
		let responseFormat: Record<string, any>;

		beforeEach(() => {
			responseFormat = zodToOpenAIResponseFormatAdapter({
				name: 'structured-output',
				zodObject: mockZodResponseFormat,
			});
		});

		test('should return the correct response format', () => {
			expect(responseFormat).toStrictEqual(
				expect.objectContaining(expectedOpenAIResponseFormat),
			);
		});
	});
});
