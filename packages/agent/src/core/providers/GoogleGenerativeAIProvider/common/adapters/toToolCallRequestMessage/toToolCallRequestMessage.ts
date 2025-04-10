import type { FunctionCall } from '@google/generative-ai';
import { Role } from '@core/providers/GoogleGenerativeAIProvider/common/enums';
import type { ModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import type { GoogleGenerativeAIToolCallRequestMessage } from '@core/providers/GoogleGenerativeAIProvider/common/interfaces';

interface Params {
	responseMessage: ModelResponse;
}

export const toToolCallRequestMessage = ({
	responseMessage,
}: Params): GoogleGenerativeAIToolCallRequestMessage => {
	const toolCalls = responseMessage.toolCalls!.map((toolCall) => {
		const rawToolCall = toolCall.rawToolCall as FunctionCall;

		return {
			functionCall: {
				name: rawToolCall.name,
				args: rawToolCall.args,
			},
		};
	});

	return {
		parts: toolCalls,
		role: Role.Model,
	};
};

/**
 
Google Generative AI Message: Tool Call Request
-----------------------------------------------
{
	parts: [
		{
			functionCall: {
				name: 'getDirectoryStructure',
				args: {},
			},
		},
	],
	role: 'model',
}


Anthropic Message: Tool Call Request (with parameters)
-------------------------------------------------------
{
	parts: [
		{
			functionCall: {
				name: 'getWeather',
				args: {
					city: 'SF',
					stateCode: 'Ca',
					countryCode: 'US',
				},
			},
		},
	],
	role: 'model',
}

*/
