import OpenAI from 'openai';
import { Anthropic } from '@anthropic-ai/sdk';

export interface IToolCall {
	id: string;
	name: string;
	parameters: unknown;
	rawToolCall:
		| Anthropic.Messages.ToolUseBlock
		| OpenAI.Chat.Completions.ChatCompletionMessageToolCall;
}
