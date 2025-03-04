import type { IToolCallResponseMessage } from '@core/providers/OpenAIProvider/common/interfaces';

interface IParams {
	toolCallResults: {
		id: string;
		result: unknown;
	}[];
}

export const toToolCallResponseMessages = ({
	toolCallResults,
}: IParams): IToolCallResponseMessage => {
	const toolResultMessages = toolCallResults.map((toolCallResults) => {
		return {
			role: 'tool',
			tool_call_id: toolCallResults.id,
			content: JSON.stringify(toolCallResults.result),
		};
	});

	return {
		customMessages: [...toolResultMessages],
	};
};

// Example for reference
// --------------------------------
// const toolResultMessage = {
//   "role": "tool",
//   "tool_call_id": "call_1",
//   "content": "{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\"}"
// }
