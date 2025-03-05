import type { ToolCallResults } from '@core/providers/BaseProvider/common/interfaces';
import type { IToolCallResponseMessage } from '@core/providers/AnthropicProvider/common/interfaces';

export const toToolCallResponseMessages = ({
	toolCallResults,
}: ToolCallResults): IToolCallResponseMessage => {
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
