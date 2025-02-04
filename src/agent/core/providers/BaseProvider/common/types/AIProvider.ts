import type { OpenAIProvider } from '@agent/core/providers/OpenAIProvider/OpenAIProvider';
import type { AnthropicProvider } from '@agent/core/providers/AnthropicProvider/AnthropicProvider';

export type AIProvider = OpenAIProvider | AnthropicProvider;
