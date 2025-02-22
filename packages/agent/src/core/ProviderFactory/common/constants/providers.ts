import { ProviderName } from '@sparrowstack/core';
import { OpenAIProvider } from '@core/providers/OpenAIProvider';
import { AnthropicProvider } from '@core/providers/AnthropicProvider';
import { GoogleGenerativeAIProvider } from '@core/providers/GoogleGenerativeAIProvider';

export const providers = {
	[ProviderName.OpenAI]: OpenAIProvider,
	[ProviderName.Anthropic]: AnthropicProvider,
	[ProviderName.GoogleGenerativeAI]: GoogleGenerativeAIProvider,
};
