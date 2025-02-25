export const toToolCallResponseMessages = ({
	toolCallResults,
}: {
	toolCallResults: {
		id?: string;
		result: unknown;
	}[];
}) => {
	const toolResultMessages = toolCallResults.map((toolCallResults) => {
		return {
			role: 'tool',
			tool_call_id: toolCallResults.id,
			content: JSON.stringify(toolCallResults.result),
		};
	});

	return [...toolResultMessages];
};

// Example for reference
// --------------------------------
// const toolResultMessage = {
//   "role": "tool",
//   "tool_call_id": "call_1",
//   "content": "{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\"}"
// }
