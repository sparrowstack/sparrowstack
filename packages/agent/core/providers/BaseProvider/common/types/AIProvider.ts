import type { OpenAIProvider } from '@/packages/agent/core/providers/OpenAIProvider/OpenAIProvider';
import type { AnthropicProvider } from '@/packages/agent/core/providers/AnthropicProvider/AnthropicProvider';

export type AIProvider = OpenAIProvider | AnthropicProvider;
