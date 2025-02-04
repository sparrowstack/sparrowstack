import type { SystemPrompt } from '@system-prompt';
import { ToolRegistry } from '@sparrow/core/ToolRegistry';
import type { ProviderName } from '@sparrow/core/providers/BaseProvider/common/enums';
import type { ChatMessageManager } from '@sparrow/core/ChatMessageManager/ChatMessageManager';
import type { IModelResponseToolCall } from '@sparrow/core/providers/BaseProvider/common/interfaces';
import {
	executeToolCall,
	executeValidationCheck,
	executeMaxCallCountCheck,
} from '@sparrow/core/ToolCallManager/execute/executeToolCalls/utils';

interface IParams {
	model: string;
	providerName: ProviderName;
	systemPrompt: SystemPrompt;
	toolRegistry: ToolRegistry;
	toolCalls: IModelResponseToolCall[];
	chatMessageManager: ChatMessageManager;
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
			const { id, name } = toolCall;
			const tool = toolRegistry.getToolByName({ name });
			const runtimeParams = {
				model,
				provider: providerName,
				callCount: tool.getCallCount(),
				cachedResults: tool.getCachedResults(),
				systemPrompt: systemPrompt.getPrompt(),
				messages: chatMessageManager.getMessages(),
				lastCachedResult: tool.getLastCachedResult(),
			};

			const { isValid, validationFailedMessage } =
				await executeValidationCheck({
					tool,
					runtimeParams,
				});

			const { hasExceededMaxCallCount, maxCallCountExceededMessage } =
				await executeMaxCallCountCheck({
					tool,
					isValid,
					runtimeParams,
				});

			if (isValid && !hasExceededMaxCallCount) {
				result = await executeToolCall({
					tool,
					toolCall,
				});
			} else if (!isValid) {
				result = validationFailedMessage;
			} else if (hasExceededMaxCallCount) {
				result = maxCallCountExceededMessage;
			}

			return { id, result };
		}),
	);

	return toolCallResults;
};
