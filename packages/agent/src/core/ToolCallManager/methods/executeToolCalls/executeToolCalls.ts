import type { ProviderName } from '@sparrowstack/core';
import type { SystemPrompt } from '@sparrowstack/system-prompt';
import { ToolRegistryManager } from '@core/ToolRegistryManager';
import type { ToolCallResult } from '@core/ToolCallManager/common/types';
import type { ChatMessageManager } from '@sparrowstack/chat-message-manager';
import type { ModelResponseToolCall } from '@core/providers/BaseProvider/common/interfaces';
import type { RuntimeParams } from '@core/ToolCallManager/methods/executeToolCalls/common/interfaces/RuntimeParams';
import {
	getToolCallResult,
	handleNeedsUserPermission,
	getPermissionDeniedToolCallResult,
} from '@core/ToolCallManager/methods/executeToolCalls/common/utils';

interface Params {
	model: string;
	providerName: ProviderName;
	systemPrompt: SystemPrompt;
	toolCalls: ModelResponseToolCall[];
	chatMessageManager: ChatMessageManager;
	toolRegistryManager: ToolRegistryManager;
	onRequestPermission?: ({
		message,
	}: {
		message: string;
	}) => Promise<boolean>;
}

export const executeToolCalls = async ({
	model,
	toolCalls,
	providerName,
	systemPrompt,
	toolRegistryManager,
	chatMessageManager,
	onRequestPermission,
}: Params): Promise<ToolCallResult[]> => {
	const toolCallResults = await Promise.all(
		toolCalls.map(async (toolCall) => {
			let result: unknown;
			const { id, name, callId } = toolCall;
			const tool = toolRegistryManager.getToolByName({ name });
			const runtimeParams: RuntimeParams = {
				model,
				provider: providerName,
				callCount: tool.getCallCount(),
				cachedResults: tool.getCachedResults(),
				systemPrompt: systemPrompt.getPrompt(),
				messages: chatMessageManager.getMessages(),
				lastCachedResult: tool.getLastCachedResult(),
			};

			const hasPermission = await handleNeedsUserPermission({
				tool,
				onRequestPermission,
			});

			if (!hasPermission) {
				result = getPermissionDeniedToolCallResult({ tool });
			} else {
				result = await getToolCallResult({
					tool,
					toolCall,
					runtimeParams,
				});
			}

			return { id, callId, name, result };
		}),
	);

	return toolCallResults;
};
