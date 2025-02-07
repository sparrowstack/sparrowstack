import { OpenAIProvider } from '@agent/core/providers/OpenAIProvider';
import { AnthropicProvider } from '@agent/core/providers/AnthropicProvider';
import { ProviderName } from '@agent/core/providers/BaseProvider/common/enums/ProviderName';

export const providers = {
	[ProviderName.OpenAI]: OpenAIProvider,
	[ProviderName.Anthropic]: AnthropicProvider,
};
