interface IParams {
	toolCallResults: {
		id: string;
		result: unknown;
	}[];
}

export const toToolCallResponseMessages = ({ toolCallResults }: IParams) => {
	const toolResultMessages = toolCallResults.map((toolCallResult) => {
		return {
			role: 'user',
			content: [
				{
					type: 'tool_result',
					tool_use_id: toolCallResult.id,
					content: JSON.stringify(toolCallResult.result),
				},
			],
		};
	});

	return {
		customMessages: [...toolResultMessages],
	};
};

// Example for reference
// --------------------------------
