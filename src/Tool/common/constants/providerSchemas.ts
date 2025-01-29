import { ProviderName } from '@Agent/common/enums';
import { toOpenAISchema, toAnthropicSchema } from '@Tool/common/schemaAdapters';

export const providerSchemas = {
	[ProviderName.OpenAI]: toOpenAISchema,
	[ProviderName.Anthropic]: toAnthropicSchema,
};
