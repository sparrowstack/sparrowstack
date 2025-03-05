import type { ToolCallResults } from '@core/providers/BaseProvider/common/interfaces';
import type { IToolCallResponseMessage } from '@core/providers/OpenAIProvider/common/interfaces';

export const toToolCallResponseMessages = ({
	toolCallResults,
}: ToolCallResults): IToolCallResponseMessage => {
	const toolResultMessages = toolCallResults.map((toolCallResult) => {
		return {
			role: 'tool',
			tool_call_id: toolCallResult.id,
			content: JSON.stringify(toolCallResult.result),
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
