import { OpenAIProvider } from '@sparrow/core/providers/OpenAIProvider';
import { AnthropicProvider } from '@sparrow/core/providers/AnthropicProvider';
import { ProviderName } from '@sparrow/core/providers/BaseProvider/common/enums/ProviderName';

export const providers = {
	[ProviderName.OpenAI]: OpenAIProvider,
	[ProviderName.Anthropic]: AnthropicProvider,
};
