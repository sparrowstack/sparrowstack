import { type ModelResponseToolCall } from '@core/providers/BaseProvider/common/interfaces/ModelResponseToolCall';

export interface Usage {
	inputTokens?: number;
	outputTokens?: number;
	totalTokens?: number;
}

export interface ModelResponse {
	// Message metadata
	id: string;
	type: string;
	role: string;
	model: string;
	text: string;

	// Sequence information
	// TODO: Normalize Stop Reason
	stopReason?: string | null;
	stopSequence?: string | null;

	// Usage statistics
	usage?: Usage;

	// Tool Calling
	toolCalls?: ModelResponseToolCall[];

	// Raw message
	rawMessage: unknown;
}
