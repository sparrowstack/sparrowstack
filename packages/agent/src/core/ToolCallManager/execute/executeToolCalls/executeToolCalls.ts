import { ToolRegistry } from '@core/ToolRegistry';
import type { ProviderName } from '@sparrowstack/core';
import type { SystemPrompt } from '@sparrowstack/system-prompt';
import type { ToolCallResult } from '@core/ToolCallManager/common/types';
import type { ChatMessageManager } from '@sparrowstack/chat-message-manager';
import type { ModelResponseToolCall } from '@core/providers/BaseProvider/common/interfaces';
import {
	executeToolCall,
	executeValidationCheck,
	executeMaxCallCountCheck,
} from '@core/ToolCallManager/execute/executeToolCalls/utils';

interface IParams {
	model: string;
	providerName: ProviderName;
	systemPrompt: SystemPrompt;
	toolRegistry: ToolRegistry;
	toolCalls: ModelResponseToolCall[];
	chatMessageManager: ChatMessageManager;
}

export const executeToolCalls = async ({
	model,
	toolCalls,
	providerName,
	systemPrompt,
	toolRegistry,
	chatMessageManager,
}: IParams): Promise<ToolCallResult[]> => {
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
				// The object is for Gemini compatibility
				// but seems to work for all providers
				result = {
					error: {
						message: validationFailedMessage,
					},
				};
			} else if (hasExceededMaxCallCount) {
				// The object is for Gemini compatibility
				// but seems to work for all providers
				result = {
					error: {
						message: maxCallCountExceededMessage,
					},
				};
			}

			return { id, name, result };
		}),
	);

	return toolCallResults;
};
