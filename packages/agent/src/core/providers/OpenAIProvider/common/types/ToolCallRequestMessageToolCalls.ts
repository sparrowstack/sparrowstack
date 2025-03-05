import type { OpenAI } from 'openai';

export type ToolCallRequestMessageToolCalls =
	OpenAI.Chat.Completions.ChatCompletionMessageToolCall[];
