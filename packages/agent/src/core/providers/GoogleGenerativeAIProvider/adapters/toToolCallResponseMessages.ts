export const toToolCallResponseMessages = ({
	toolCallResults,
}: {
	toolCallResults: {
		id: string;
		result: unknown;
	}[];
}) => {
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

	return [...toolResultMessages];
};

// Example for reference
// --------------------------------
