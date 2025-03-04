import { type ModelResponseToolCall } from '@core/providers/BaseProvider/common/interfaces/ModelResponseToolCall';

export interface IUsage {
	inputTokens: number | null;
	outputTokens: number | null;
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
	usage?: IUsage;

	// Tool Calling
	toolCalls?: ModelResponseToolCall[];

	// Additional metadata
	created?: number; // Unix timestamp
	systemFingerprint?: string; // OpenAI specific , but useful for tracking
	rawMessage: unknown;
}
