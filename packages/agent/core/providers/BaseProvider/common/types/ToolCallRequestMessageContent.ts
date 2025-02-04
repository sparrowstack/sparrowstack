import { OpenAI } from 'openai';
import { Anthropic } from '@anthropic-ai/sdk';

export type ToolCallRequestMessageContent =
	| OpenAI.Chat.Completions.ChatCompletionMessageToolCall[]
	| Anthropic.Messages.ToolUseBlock[];
