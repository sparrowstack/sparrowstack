import { Role } from '@sparrowstack/core';
import { Anthropic } from '@anthropic-ai/sdk';
import type { ModelResponse } from '@core/providers/BaseProvider/common/interfaces';

export const toToolCallRequestMessage = ({
	responseMessage,
}: {
	responseMessage: ModelResponse;
}) => {
	const toolCalls = responseMessage.toolCalls!.map((toolCall) => {
		return toolCall.rawToolCall;
	}) as Anthropic.Messages.ToolUseBlock[];

	return {
		role: Role.Assistant,
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
