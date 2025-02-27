import type { OpenAIProvider } from '@core/providers/OpenAIProvider/OpenAIProvider';
import type { AnthropicProvider } from '@core/providers/AnthropicProvider/AnthropicProvider';
import type { GoogleGenerativeAIProvider } from '@core/providers/GoogleGenerativeAIProvider/GoogleGenerativeAIProvider';

export type AIProvider =
	| OpenAIProvider
	| AnthropicProvider
	| GoogleGenerativeAIProvider;
