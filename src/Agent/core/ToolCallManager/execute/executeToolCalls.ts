import type { IToolRegistry } from '@Agent/core/ToolRegistryFactory/common/interfaces';
import type { IModelResponseToolCall } from '@Agent/core/providers/BaseProvider/common/interfaces';

interface IParams {
	toolRegistry: IToolRegistry;
	toolCalls: IModelResponseToolCall[];
}

export const executeToolCalls = async ({
	toolCalls,
	toolRegistry,
}: IParams) => {
	const toolCallResults = await Promise.all(
		toolCalls.map(async (toolCall) => {
			const { id, name, parameters } = toolCall;
			const tool = toolRegistry[name];
			const toolCallFunction = tool?.function;
			// TODO: JSON.parse(toolCall.function.arguments);
			const result = await toolCallFunction(parameters);

			tool.callCount += 1;

			return { id, result };
		}),
	);

	return toolCallResults;
};
