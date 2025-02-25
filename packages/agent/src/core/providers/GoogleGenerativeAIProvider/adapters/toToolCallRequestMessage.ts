import { Role } from '@sparrowstack/core';
import type { IModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import type { FunctionCall } from '@google/generative-ai';

export const toToolCallRequestMessage = ({
	responseMessage,
}: {
	responseMessage: IModelResponse;
}) => {
	const toolCalls = responseMessage.toolCalls!.map((toolCall) => {
		return toolCall.rawToolCall;
	}) as FunctionCall[];

	return {
		role: Role.Model,
		content: toolCalls,
	};
};

// Example for reference
// --------------------------------
// {
// 	"role": "assistant",
// 	"content": [
// 		{
// 			"type": "tool_use",
// 			"id": "toolu_01",
// 			"name": "getDirectoryStructure",
// 			"input": {}
// 		},
// 	]
// },
