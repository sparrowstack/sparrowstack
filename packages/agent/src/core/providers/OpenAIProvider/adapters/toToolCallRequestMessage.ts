import { OpenAI } from 'openai';
import { Role } from '@sparrowstack/core';
import type { ModelResponse } from '@core/providers/BaseProvider/common/interfaces';

export const toToolCallRequestMessage = ({
	responseMessage,
}: {
	responseMessage: ModelResponse;
}) => {
	const toolCalls = responseMessage.toolCalls!.map((toolCall) => {
		return toolCall.rawToolCall;
	}) as OpenAI.Chat.Completions.ChatCompletionMessageToolCall[];

	return {
		role: Role.Assistant,
		tool_calls: toolCalls,
	};
};

// Example for reference
// --------------------------------
// 	const toolCallRequestMessage = {
// 		role: 'assistant',
// 		tool_calls: [
// 			{
// 				id: 'call_1',
// 				type: 'function',
// 				function: {
// 					name: 'getUserDetails',
// 					arguments: '{ "userId": "123" }',
// 				},
// 			},
// 			{
// 				id: 'call_2',
// 				type: 'function',
// 				function: {
// 					name: 'getDirectoryStructure',
// 					arguments: '{}',
// 				},
// 			},
// 		],
// 	};
