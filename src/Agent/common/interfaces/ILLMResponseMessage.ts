import type { LLMResponseMessageRaw } from '../types';

export interface IUsage {
	inputTokens: number | null;
	outputTokens: number | null;
}

export interface ILLMResponseMessage {
	// Message metadata
	id: string;
	type: string;
	role: string;
	model: string;

	// TODO: Add support for an array of content types later, when needed
	// Content/Text related
	contentType: string;
	contentText: string;

	// Sequence information
	stopReason: string | null;
	stopSequence?: string | null;

	// Usage statistics
	usage: IUsage;

	// Tool usage (function calling)
	toolCalls?: Array<{
		id: string;
		type: 'function';
		function: {
			name: string;
			arguments: string;
		};
	}>;

	// Additional metadata
	created?: number; // Unix timestamp
	systemFingerprint?: string; // OpenAI specific , but useful for tracking
	rawMessage: LLMResponseMessageRaw;
}
