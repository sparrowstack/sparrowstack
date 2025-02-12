import { OpenAIProvider } from '@core/providers/OpenAIProvider';
import { AnthropicProvider } from '@core/providers/AnthropicProvider';
import { ProviderName } from '@core/providers/BaseProvider/common/enums/ProviderName';

export const providers = {
	[ProviderName.OpenAI]: OpenAIProvider,
	[ProviderName.Anthropic]: AnthropicProvider,
};
