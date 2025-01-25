import { Provider } from '@Agent/common/enums';
import { toOpenAISchema, toAnthropicSchema } from '@Tool/common/schemaAdapters';

export const providerSchemas = {
	[Provider.OpenAI]: toOpenAISchema,
	[Provider.Anthropic]: toAnthropicSchema,
};
