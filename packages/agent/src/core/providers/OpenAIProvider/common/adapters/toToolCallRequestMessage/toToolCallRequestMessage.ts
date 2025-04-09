import { OpenAI } from 'openai';
import type { ModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import type { OpenAIToolCallRequestMessages } from '@core/providers/OpenAIProvider/common/types';
export const toToolCallRequestMessage = ({
	responseMessage,
}: {
	responseMessage: ModelResponse;
}): OpenAIToolCallRequestMessages => {
	const toolCalls = responseMessage.toolCalls!.map((toolCall) => {
		return toolCall.rawToolCall;
	}) as OpenAI.Responses.ResponseFunctionToolCall[];

	return toolCalls;
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
