import { Anthropic } from '@anthropic-ai/sdk';

interface IParams {
	response: Anthropic.Messages.Message;
}

export enum ContentType {
	ToolUse = 'tool_use',
}

export const getToolCalls = ({ response }: IParams) => {
	const toolCalls = response.content.filter(
		(content) => content.type === ContentType.ToolUse,
	) as Anthropic.Messages.ToolUseBlock[];

	const adaptedToolCalls = toolCalls.map((toolCall) => {
		return {
			id: toolCall.id,
			name: toolCall.name,
			parameters: toolCall.input,
			rawToolCall: toolCall,
		};
	});

	return adaptedToolCalls;
};
