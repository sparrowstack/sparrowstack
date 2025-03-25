import { ProviderName } from '@sparrowstack/core';
import {
	zodToOpenAIResponseFormatAdapter,
	zodToAnthropicResponseFormatAdapter,
	zodToGoogleGenerativeAIResponseFormatAdapter,
} from '@structured-output/common/responseFormatAdapters/zod';

export const responseFormatAdapters = {
	[ProviderName.OpenAI]: zodToOpenAIResponseFormatAdapter,
	[ProviderName.Anthropic]: zodToAnthropicResponseFormatAdapter,
	[ProviderName.GoogleGenerativeAI]:
		zodToGoogleGenerativeAIResponseFormatAdapter,
};
