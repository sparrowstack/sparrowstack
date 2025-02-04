import { ProviderName } from '@/packages/agent/core/providers/BaseProvider/common/enums';
import {
	toOpenAISchema,
	toAnthropicSchema,
} from '@/packages/tool/common/schemaAdapters';

export const providerSchemas = {
	[ProviderName.OpenAI]: toOpenAISchema,
	[ProviderName.Anthropic]: toAnthropicSchema,
};
