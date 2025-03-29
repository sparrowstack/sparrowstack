import { expect, test, describe, beforeEach } from 'bun:test';
import {
	mockZodResponseFormat,
	expectedAnthropicResponseFormat,
} from '@tests/mocks';
import { zodToAnthropicResponseFormatAdapter } from '@structured-output/common/responseFormatAdapters/zod';

describe('zodToAnthropicResponseFormatAdapter', () => {
	describe('when provided a Zod responseFormat', () => {
		let responseFormat: Record<string, any>;

		beforeEach(() => {
			responseFormat = zodToAnthropicResponseFormatAdapter({
				zodObject: mockZodResponseFormat,
			});
		});

		test('should return the correct response format', () => {
			expect(responseFormat).toStrictEqual(
				expectedAnthropicResponseFormat,
			);
		});
	});
});
