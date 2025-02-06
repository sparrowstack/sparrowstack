import { ProviderName } from '../../../../../src/agent/core/providers/BaseProvider/common/enums/ProviderName';
import { toOpenAISchema, toAnthropicSchema } from '@tool/common/schemaAdapters';

export const providerSchemas = {
	[ProviderName.OpenAI]: toOpenAISchema,
	[ProviderName.Anthropic]: toAnthropicSchema,
};
