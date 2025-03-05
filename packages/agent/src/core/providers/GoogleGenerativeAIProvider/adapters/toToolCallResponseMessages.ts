import type { IToolCallResponseMessage } from '@core/providers/GoogleGenerativeAIProvider/common/interfaces';
import type { ToolCallResults } from '@core/providers/BaseProvider/common/interfaces';

export const toToolCallResponseMessages = ({
	toolCallResults,
}: ToolCallResults): IToolCallResponseMessage => {
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

	const assistantMessages = {
		role: 'function' as const,
		parts: [...functionResponses],
	};

	// Gemini expects the user response to be a JSON string
	const userTexts = toolCallResults.map(({ result }) => {
		let text: string;

		try {
			text = typeof result === 'string' ? result : JSON.stringify(result);
		} catch {
			text = result as string;
		}

		return {
			text,
		};
	});

	const userMessages = {
		role: 'user' as const,
		parts: [...userTexts],
	};

	return {
		assistantMessages: [assistantMessages],
		userMessages: [userMessages],
	};
};

// Example for reference
// --------------------------------
