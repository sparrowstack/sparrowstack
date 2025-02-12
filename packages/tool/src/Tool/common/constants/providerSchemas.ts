import { ProviderName } from '@sparrowstack/core';
import { toOpenAISchema, toAnthropicSchema } from '@tool/common/schemaAdapters';

export const providerSchemas = {
	[ProviderName.OpenAI]: toOpenAISchema,
	[ProviderName.Anthropic]: toAnthropicSchema,
};
