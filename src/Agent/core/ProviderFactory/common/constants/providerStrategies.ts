import { Provider } from '@Agent';
import { OpenAIProvider } from '@Agent/core/Providers/OpenAIProvider';
import { AnthropicProvider } from '@Agent/core/Providers/AnthropicProvider';

export const providerStrategies = {
	[Provider.OpenAI]: OpenAIProvider,
	[Provider.Anthropic]: AnthropicProvider,
};
