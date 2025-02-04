import { OpenAI } from 'openai';
import { Role } from '@/packages/agent/core/ChatMessage/common/enums/Role';
import type { IModelResponse } from '@/packages/agent/core/providers/BaseProvider/common/interfaces';

export const toToolCallRequestMessage = ({
	responseMessage,
}: {
	responseMessage: IModelResponse;
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
