import { OpenAI } from 'openai';

enum ToolCallType {
	Function = 'function',
}

interface IParams {
	message: OpenAI.Chat.Completions.ChatCompletionMessage;
}

export const getToolCalls = ({ message }: IParams) => {
	const toolCalls = message?.tool_calls?.filter(
		(toolCall) => toolCall.type === ToolCallType.Function,
	) as OpenAI.Chat.Completions.ChatCompletionMessageToolCall[];

	const adaptedToolCalls = toolCalls?.map((toolCall) => {
		return {
			id: toolCall.id,
			name: toolCall.function.name,
			parameters: toolCall.function.arguments,
			rawToolCall: toolCall,
		};
	});

	return adaptedToolCalls || [];
};
