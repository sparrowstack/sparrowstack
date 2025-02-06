import type { Tool } from '@sparrowstack/tool';
import type { IModelResponseToolCall } from '@agent/core/providers/BaseProvider/common/interfaces';

export const executeToolCall = async ({
	tool,
	toolCall,
}: {
	tool: Tool;
	toolCall: IModelResponseToolCall;
}) => {
	const toolCallFunction = tool?.function;
	const { id, parameters } = toolCall;

	// Make tool call
	const parsedParameters =
		typeof parameters === 'string' ? JSON.parse(parameters) : parameters;
	const toolCallResult = await toolCallFunction(parsedParameters);

	// Update tool call count and cache
	tool.incrementCallCount();
	tool.addCachedResult({
		result: { id, result: toolCallResult },
	});

	return toolCallResult;
};
