import { ProviderName } from '@Agent';
import { OpenAIProvider } from '@Agent/core/providers/OpenAIProvider';
import { AnthropicProvider } from '@Agent/core/providers/AnthropicProvider';

export const providers = {
	[ProviderName.OpenAI]: OpenAIProvider,
	[ProviderName.Anthropic]: AnthropicProvider,
};
