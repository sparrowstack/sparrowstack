import { OpenAI } from 'openai';
import { Role } from '@core/providers/OpenAIProvider/common/enums/Role';
import type { ModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import type { OpenAIToolCallRequestMessage } from '@core/providers/OpenAIProvider/common/interfaces';
export const toToolCallRequestMessage = ({
	responseMessage,
}: {
	responseMessage: ModelResponse;
}): OpenAIToolCallRequestMessage => {
	const toolCalls = responseMessage.toolCalls!.map((toolCall) => {
		return toolCall.rawToolCall;
	}) as OpenAI.Chat.Completions.ChatCompletionMessageToolCall[];

	return {
		role: Role.Assistant,
		tool_calls: toolCalls,
	};
};

/**
OpenAI Message: Tool Call Request
------------------------------------
{
	role: 'assistant',
	tool_calls: [
		{
			id: 'call_awfdxoPFVxc5rkyodgR7pXZ7',
			type: 'function',
			function: {
				name: 'getDirectoryStructure',
				arguments: '{}',
			},
		},
	],
}

OpenAI Message: Tool Call Request (with parameters)
-------------------------------------------------------
{
	role: 'assistant',
	tool_calls: [
		{
			id: 'call_awfdxoPFVxc5rkyodgR7pXZ7',
			type: 'function',
			function: {
				name: 'getWeather',
				arguments:
					'{"city":"San Francisco","stateCode":"CA","countryCode":"US"}',
			},
		},
	],
}

 */
