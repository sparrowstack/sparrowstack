import { OpenAI } from 'openai';
// import { Anthropic } from '@anthropic-ai/sdk';

export type ToolCallsContentResponse =
	OpenAI.Chat.Completions.ChatCompletionToolMessageParam[];
