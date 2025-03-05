import type { OpenAI } from 'openai';

export type ToolCallRequestMessageContent =
	OpenAI.Chat.Completions.ChatCompletionMessageToolCall[];
