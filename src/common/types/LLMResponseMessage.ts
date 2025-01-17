import { Anthropic } from '@anthropic-ai/sdk';

export type AnthropicLLMResponseMessage = Anthropic.Messages.Message & {
	_request_id?: string | null;
};

// TODO: Make this interface, and common for all LLMs
export type LLMResponseMessage = AnthropicLLMResponseMessage;
