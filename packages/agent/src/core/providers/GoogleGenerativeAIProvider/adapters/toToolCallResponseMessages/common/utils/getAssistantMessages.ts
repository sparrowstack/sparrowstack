import type { ToolCallResult } from '@core/ToolCallManager/common/types';
import { Role } from '@core/providers/GoogleGenerativeAIProvider/common/enums/Role';
import type { GoogleGenerativeAIToolCallFunctionResponseMessage } from '@core/providers/GoogleGenerativeAIProvider/common/interfaces';

export const getAssistantMessages = (
	toolCallResults: ToolCallResult[],
): GoogleGenerativeAIToolCallFunctionResponseMessage => {
	// Gemini expects the function response to be the raw result
	const functionResponses = toolCallResults.map(({ name, result }) => {
		let response = result;

		try {
			response = JSON.parse(result as string);
		} catch {
			// Do nothing
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
