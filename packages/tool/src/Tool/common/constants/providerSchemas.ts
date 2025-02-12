import { ProviderName } from '@sparrowstack/agent';
import { toOpenAISchema, toAnthropicSchema } from '@tool/common/schemaAdapters';

export const providerSchemas = {
	[ProviderName.OpenAI]: toOpenAISchema,
	[ProviderName.Anthropic]: toAnthropicSchema,
};
