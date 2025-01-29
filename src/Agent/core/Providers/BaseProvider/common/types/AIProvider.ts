import type { OpenAIProvider } from '@Agent/core/providers/OpenAIProvider/OpenAIProvider';
import type { AnthropicProvider } from '@Agent/core/providers/AnthropicProvider/AnthropicProvider';

export type AIProvider = OpenAIProvider | AnthropicProvider;
