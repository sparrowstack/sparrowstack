import type { ToolCallResult } from '@core/ToolCallManager/common/types';
import { Role } from '@core/providers/GoogleGenerativeAIProvider/common/enums/Role';
import type { GoogleGenerativeAIToolCallFunctionResponseMessage } from '@core/providers/GoogleGenerativeAIProvider/common/interfaces';
import { isJsonString } from '@core/providers/GoogleGenerativeAIProvider/common/adapters/toToolCallResponseMessages/common/utils/isJsonString';
export const getAssistantMessages = (
	toolCallResults: ToolCallResult[],
): GoogleGenerativeAIToolCallFunctionResponseMessage => {
	// Gemini expects the function response to be the raw result
	const functionResponses = toolCallResults.map(({ name, result }) => {
		const isJson = isJsonString({ jsonString: result as string });
		let response = result;

		if (isJson) {
			response = JSON.parse(result);
		}
		// If the response is not JSON, we'll return the raw result
		else {
			response = { result };
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
