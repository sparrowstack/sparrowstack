import { randomUUIDv7 } from 'bun';
import type { GenerateContentResult } from '@google/generative-ai';

interface Params {
	response: GenerateContentResult;
}

export const getToolCalls = ({ response }: Params) => {
	const toolCalls = response.response.functionCalls() || [];

	const adaptedToolCalls = toolCalls.map((toolCall) => {
		return {
			id: randomUUIDv7(),
			name: toolCall.name,
			parameters: toolCall.args,
			rawToolCall: toolCall,
		};
	});

	return adaptedToolCalls;
};
