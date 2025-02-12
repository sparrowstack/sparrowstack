import OpenAI from 'openai';
import { Anthropic } from '@anthropic-ai/sdk';
import { type IModelResponseToolCall } from '@core/providers/BaseProvider/common/interfaces/IModelResponseToolCall';

type RawMessageResponse = Anthropic.Messages.Message | OpenAI.ChatCompletion;

export interface IUsage {
	inputTokens: number | null;
	outputTokens: number | null;
}

export interface IModelResponse {
	// Message metadata
	id: string;
	type: string;
	role: string;
	model: string;
	text: string;

	// Sequence information
	// TODO: Normalize Stop Reason
	stopReason: string | null;
	stopSequence?: string | null;

	// Usage statistics
	usage: IUsage;

	// Tool Calling
	toolCalls?: IModelResponseToolCall[];

	// Additional metadata
	created?: number; // Unix timestamp
	systemFingerprint?: string; // OpenAI specific , but useful for tracking
	rawMessage: RawMessageResponse;
}
