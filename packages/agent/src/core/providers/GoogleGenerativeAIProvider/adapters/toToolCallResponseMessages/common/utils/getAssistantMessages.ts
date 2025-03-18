import type { ToolCallResult } from '@core/ToolCallManager/common/types';
import { Role } from '@core/providers/GoogleGenerativeAIProvider/common/enums/Role';
import type { GoogleGenerativeAIToolCallFunctionResponseMessage } from '@core/providers/GoogleGenerativeAIProvider/common/interfaces';

export const getAssistantMessages = (
	toolCallResults: ToolCallResult[],
): GoogleGenerativeAIToolCallFunctionResponseMessage => {
	// Gemini expects the function response to be the raw result
	const functionResponses = toolCallResults.map(({ name, result }) => {
		let response = result;

		// If the response is an JSON object, parse it
		try {
			response = JSON.parse(result as string);
		} catch {}

		// If the response is still a string,
		// we're assuming the response is a raw string,
		// In this case we wrap it in an object as
		// Gemini will choke on a raw string 'response' value
		if (typeof response === 'string') {
			response = {
				message: response,
			};
		}

		return {
			functionResponse: {
				name,
				response,
			},
		};
	});

	const assistantMessages: GoogleGenerativeAIToolCallFunctionResponseMessage =
		{
			role: Role.FunctionCall,
			parts: [...functionResponses],
		};

	return assistantMessages;
};
