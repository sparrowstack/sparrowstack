import { OpenAIProvider } from '@Agent/core/providers/OpenAIProvider';
import { AnthropicProvider } from '@Agent/core/providers/AnthropicProvider';
import { ProviderName } from '@Agent/core/providers/BaseProvider/common/enums/ProviderName';

export const providers = {
	[ProviderName.OpenAI]: OpenAIProvider,
	[ProviderName.Anthropic]: AnthropicProvider,
};
