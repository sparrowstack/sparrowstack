import { Provider } from '@Agent';
import { OpenAIProvider } from '@Agent/core/providers/OpenAIProvider';
import { AnthropicProvider } from '@Agent/core/providers/AnthropicProvider';

export const providers = {
	[Provider.OpenAI]: OpenAIProvider,
	[Provider.Anthropic]: AnthropicProvider,
};
