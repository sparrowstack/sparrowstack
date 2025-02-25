import type { GenerateContentResult } from '@google/generative-ai';

interface IParams {
	response: GenerateContentResult;
}

export const getToolCalls = ({ response }: IParams) => {
	const toolCalls = response.response.functionCalls() || [];

	const adaptedToolCalls = toolCalls.map((toolCall) => {
		return {
			name: toolCall.name,
			parameters: toolCall.args,
			rawToolCall: toolCall,
		};
	});

	return adaptedToolCalls;
};
