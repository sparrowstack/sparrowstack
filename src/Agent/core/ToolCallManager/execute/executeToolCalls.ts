import type { SystemPrompt } from '@SystemPrompt';
import type { ProviderName } from '@Agent/core/providers/BaseProvider/common/enums';
import type { IToolRegistry } from '@Agent/core/ToolRegistryFactory/common/interfaces';
import type { ChatMessageManager } from '@Agent/core/ChatMessageManager/ChatMessageManager';
import type { IModelResponseToolCall } from '@Agent/core/providers/BaseProvider/common/interfaces';

interface IParams {
	model: string;
	providerName: ProviderName;
	systemPrompt: SystemPrompt;
	toolRegistry: IToolRegistry;
	chatMessageManager: ChatMessageManager;
	toolCalls: IModelResponseToolCall[];
}

export const executeToolCalls = async ({
	model,
	toolCalls,
	providerName,
	systemPrompt,
	toolRegistry,
	chatMessageManager,
}: IParams) => {
	const toolCallResults = await Promise.all(
		toolCalls.map(async (toolCall) => {
			let result: unknown;
			let isValid = true;
			const { id, name, parameters } = toolCall;
			const tool = toolRegistry[name];
			const toolCallFunction = tool?.function;
			const params =
				typeof parameters === 'string'
					? JSON.parse(parameters)
					: parameters;
			const runtimeParams = {
				model,
				provider: providerName,
				callCount: tool.getCallCount(),
				cachedResults: tool.getCachedResults(),
				systemPrompt: systemPrompt.getPrompt(),
				messages: chatMessageManager.getMessages(),
				lastCachedResult: tool.getLastCachedResult(),
			};

			if (tool.validate && isValid) {
				const defaultMessage = `TOOL_CALL_VALIDATION_CHECK_FAILED`;
				let validationFailedMessage = null;

				if (tool.validationFailedMessage) {
					validationFailedMessage =
						typeof tool.validationFailedMessage === 'string'
							? tool.validationFailedMessage
							: await tool.validationFailedMessage(runtimeParams);
				}

				isValid = await tool.validate(runtimeParams);

				if (!isValid) {
					result = validationFailedMessage || defaultMessage;
				}
			}

			// if (tool.maxCallCount && tool.getCallCount() >= tool.maxCallCount) {
			// 	const defaultMessage = `The tool "${name}" has exceeded its maximum call count.`;
			// 	result =
			// 		defaultMessage + JSON.stringify(tool.getLastCachedResult());
			// }

			if (isValid) {
				result = await toolCallFunction(params);

				tool.incrementCallCount();
				tool.addCachedResult({
					result: { id, result },
				});
			}

			return { id, result };
		}),
	);

	return toolCallResults;
};
