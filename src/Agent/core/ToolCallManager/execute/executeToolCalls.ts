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
			const params =
				typeof parameters === 'string'
					? JSON.parse(parameters)
					: parameters;

			const result = await toolCallFunction(params);

			tool.incrementCallCount();
			tool.addCachedResult({ result: { id, result } });

			return { id, result };
		}),
	);

	return toolCallResults;
};
