import OpenAI from 'openai';
import { Anthropic } from '@anthropic-ai/sdk';

export interface IUsage {
	inputTokens: number | null;
	outputTokens: number | null;
}

interface IToolCall {
	id: string;
	name: string;
	parameters: unknown; // TODO: Normalize
	rawToolCall:
		| Anthropic.Messages.ToolUseBlock
		| OpenAI.Chat.Completions.ChatCompletionMessageToolCall;
}

export interface IModelResponse {
	// Message metadata
	id: string;
	type: string;
	role: string;
	model: string;
	text: string;

	// Sequence information
	stopReason: string | null;
	stopSequence?: string | null;

	// Usage statistics
	usage: IUsage;

	// Tool usage (function calling)
	// TODO: Normalize..
	toolCalls?: IToolCall[];

	// Additional metadata
	created?: number; // Unix timestamp
	systemFingerprint?: string; // OpenAI specific , but useful for tracking
	rawMessage: Anthropic.Messages.Message | OpenAI.ChatCompletion;
}
