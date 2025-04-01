import { expect, test, describe, beforeEach } from 'bun:test';
import {
	mockZodResponseFormat,
	expectedGoogleGenerativeAIResponseFormat,
} from '@tests/mocks';
import { zodToGoogleGenerativeAIResponseFormatAdapter } from '@structured-output/common/responseFormatAdapters/zod';

describe('zodToGoogleGenerativeAIResponseFormatAdapter', () => {
	describe('when provided a Zod responseFormat', () => {
		let responseFormat: Record<string, any>;

		beforeEach(() => {
			responseFormat = zodToGoogleGenerativeAIResponseFormatAdapter({
				zodObject: mockZodResponseFormat,
			});
		});

		test('should return the correct response format', () => {
			expect(responseFormat).toStrictEqual(
				expectedGoogleGenerativeAIResponseFormat,
			);
		});
	});
});
