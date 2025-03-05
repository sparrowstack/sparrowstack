import { ProviderName } from '@sparrowstack/core';
import {
	toOpenAISchema,
	toAnthropicSchema,
	toGoogleGenerativeAI,
} from '@tool/common/schemaAdapters';

export const providerSchemas = {
	[ProviderName.OpenAI]: toOpenAISchema,
	[ProviderName.Anthropic]: toAnthropicSchema,
	[ProviderName.GoogleGenerativeAI]: toGoogleGenerativeAI,
};
