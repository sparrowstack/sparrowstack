import type { ToolFunctions } from '@Agent/core/ToolCallManager/common/types';
import type { IModelResponseToolCall } from '@Agent/core/providers/BaseProvider/common/interfaces';

interface IParams {
	functions: ToolFunctions;
	toolCalls: IModelResponseToolCall[];
}

export const executeToolCalls = async ({ toolCalls, functions }: IParams) => {
	const toolCallResults = await Promise.all(
		toolCalls.map(async (toolCall) => {
			const { id, name, parameters } = toolCall;
			const toolCallFunction = functions![name];
			// TODO: JSON.parse(toolCall.function.arguments);
			const result = await toolCallFunction(parameters);

			return { id, result };
		}),
	);

	return toolCallResults;
};
