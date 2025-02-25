export const toToolCallResponseMessages = ({
	toolCallResults,
}: {
	toolCallResults: {
		id?: string;
		result: unknown;
	}[];
}) => {
	const toolResultMessages = toolCallResults.map((toolCallResult) => {
		return [
			{
				functionResponse: {
					name: 'controlLight',
					response: toolCallResult.result,
				},
			},
		];
	});

	return [...toolResultMessages];
};

// Example for reference
// --------------------------------
