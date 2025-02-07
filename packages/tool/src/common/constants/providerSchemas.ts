import { ProviderName } from '../../../../agent/src/core/providers/BaseProvider/common/enums/ProviderName';
import { toOpenAISchema, toAnthropicSchema } from '@tool/common/schemaAdapters';

export const providerSchemas = {
	[ProviderName.OpenAI]: toOpenAISchema,
	[ProviderName.Anthropic]: toAnthropicSchema,
};
