import type { OpenAI } from 'openai';

export type OpenAIToolCallResponseMessages =
	OpenAI.Responses.ResponseFunctionToolCallOutputItem[];
