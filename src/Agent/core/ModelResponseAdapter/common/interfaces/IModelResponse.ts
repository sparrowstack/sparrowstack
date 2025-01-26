import OpenAI from 'openai';
import { Anthropic } from '@anthropic-ai/sdk';
import { type IToolCall } from '@Agent/core/ModelResponseAdapter/common/interfaces/IToolCall';

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
	toolCalls?: IToolCall[];

	// Additional metadata
	created?: number; // Unix timestamp
	systemFingerprint?: string; // OpenAI specific , but useful for tracking
	rawMessage: Anthropic.Messages.Message | OpenAI.ChatCompletion;
}
