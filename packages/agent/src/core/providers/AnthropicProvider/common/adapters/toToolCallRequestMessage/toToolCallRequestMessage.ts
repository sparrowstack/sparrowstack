import { Anthropic } from '@anthropic-ai/sdk';
import { Role } from '@core/providers/AnthropicProvider/common/enums/Role';
import type { ModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import type { AnthropicToolCallRequestMessage } from '@core/providers/AnthropicProvider/common/interfaces';

export const toToolCallRequestMessage = ({
	responseMessage,
}: {
	responseMessage: ModelResponse;
}): AnthropicToolCallRequestMessage => {
	const toolCalls = responseMessage.toolCalls!.map((toolCall) => {
		return toolCall.rawToolCall;
	}) as Anthropic.Messages.ToolUseBlock[];

	return {
		role: Role.Assistant,
		content: toolCalls,
	};
};

/**
Anthropic Message: Tool Call Request
------------------------------------
{
	role: 'assistant',
	content: [
		{
			type: 'tool_use',
			id: 'toolu_01',
			name: 'getDirectoryStructure',
			input: {},
		},
	],
};

Anthropic Message: Tool Call Request (with parameters)
-------------------------------------------------------
{
	role: 'assistant',
	content: [
		{
			type: 'tool_use',
			id: 'toolu_019eHNoEuJo8LULk7AnGL3Cp',
			name: 'getWeather',
			input: {
				city: 'San Francisco',
				stateCode: 'CA',
				countryCode: 'US',
			},
		},
	],
};

 */
