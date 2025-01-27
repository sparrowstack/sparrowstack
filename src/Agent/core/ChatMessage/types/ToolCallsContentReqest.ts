import { OpenAI } from 'openai';
import { Anthropic } from '@anthropic-ai/sdk';

export type ToolCallsContentReqest = (
	| Anthropic.Messages.ToolUseBlock
	| OpenAI.Chat.Completions.ChatCompletionMessageToolCall
)[];
