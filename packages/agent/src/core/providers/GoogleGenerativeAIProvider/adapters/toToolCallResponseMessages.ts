interface IParams {
	toolCallResults: {
		id: string;
		name: string;
		result: unknown;
	}[];
}

export const toToolCallResponseMessages = ({ toolCallResults }: IParams) => {
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
		role: 'function',
		parts: [...functionResponses],
	};

	// Gemini expects the user response to be a JSON string
	const userTexts = toolCallResults.map(({ result }) => {
		let text = result;

		try {
			text = typeof result === 'string' ? result : JSON.stringify(result);
		} catch {
			// Do nothing
		}

		return {
			text,
		};
	});

	const userMessages = {
		role: 'user',
		parts: [...userTexts],
	};

	return {
		assistantMessages: [assistantMessages],
		userMessages: [userMessages],
	};
};

// Example for reference
// --------------------------------
