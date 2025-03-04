// import OpenAI from 'openai';
// import { Anthropic } from '@anthropic-ai/sdk';
// import type { FunctionCall } from '@google/generative-ai';

export interface IModelResponseToolCall {
	id: string;
	name: string;
	parameters: unknown;
	rawToolCall: unknown;
	// | Anthropic.Messages.ToolUseBlock
	// | OpenAI.Chat.Completions.ChatCompletionMessageToolCall
	// | FunctionCall;
}
