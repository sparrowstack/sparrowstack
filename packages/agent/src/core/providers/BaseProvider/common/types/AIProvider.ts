import type { OpenAIProvider } from '@core/providers/OpenAIProvider/OpenAIProvider';
import type { AnthropicProvider } from '@core/providers/AnthropicProvider/AnthropicProvider';

export type AIProvider = OpenAIProvider | AnthropicProvider;
