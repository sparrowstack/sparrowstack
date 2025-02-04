import { OpenAIProvider } from '@/packages/agent/core/providers/OpenAIProvider';
import { AnthropicProvider } from '@/packages/agent/core/providers/AnthropicProvider';
import { ProviderName } from '@/packages/agent/core/providers/BaseProvider/common/enums/ProviderName';

export const providers = {
	[ProviderName.OpenAI]: OpenAIProvider,
	[ProviderName.Anthropic]: AnthropicProvider,
};
