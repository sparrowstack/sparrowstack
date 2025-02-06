import { ProviderName } from '@agent/core/providers/BaseProvider/common/enums';
import {
	toOpenAISchema,
	toAnthropicSchema,
} from '@sparrowstack/tool/common/schemaAdapters';

export const providerSchemas = {
	[ProviderName.OpenAI]: toOpenAISchema,
	[ProviderName.Anthropic]: toAnthropicSchema,
};
