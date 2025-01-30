import type { AIProvider } from '@Agent/core/providers/BaseProvider/common/types';
import type { IToolRegistry } from '@Agent/core/ToolRegistryFactory/common/interfaces';
import { executeToolCalls } from '@Agent/core/ToolCallManager/execute/executeToolCalls';
import type { InteractionLogger } from '@Agent/core/InteractionLogger/InteractionLogger';
import type { IModelResponse } from '@Agent/core/providers/BaseProvider/common/interfaces';
import type { ChatMessageManager } from '@Agent/core/ChatMessageManager/ChatMessageManager';

interface IConstructorParams {
	provider: AIProvider;
	toolRegistry: IToolRegistry;
	interactionLogger: InteractionLogger;
	chatMessageManager: ChatMessageManager;
}

export class ToolCallManager {
	readonly provider: AIProvider;
	readonly toolRegistry: IToolRegistry;
	readonly interactionLogger: InteractionLogger;
	readonly chatMessageManager: ChatMessageManager;

	constructor({
		provider,
		toolRegistry,
		interactionLogger,
		chatMessageManager,
	}: IConstructorParams) {
		this.provider = provider;
		this.toolRegistry = toolRegistry;
		this.interactionLogger = interactionLogger;
		this.chatMessageManager = chatMessageManager;
	}

	// Note: Could probably do some cleaning up here
	// as this is a large method. But still working
	// out all features needed for tool calls so keeping
	// as is for now to have all code in one place.
	public async handleToolCalls({
		responseMessage,
	}: {
		responseMessage: IModelResponse;
	}) {
		let toolCallResponseMessage: IModelResponse | null = null;

		if (
			Array.isArray(responseMessage.toolCalls) &&
			responseMessage.toolCalls.length > 0
		) {
			this.interactionLogger.logModelResponse({
				message: responseMessage,
			});

			const assistantToolCallRequestMessage =
				this.provider.adapters.toToolCallRequestMessage({
					responseMessage,
				});

			this.chatMessageManager.addToMessages({
				message: assistantToolCallRequestMessage,
			});

			// Execute tool calls
			const toolCallResults = await executeToolCalls({
				toolRegistry: this.toolRegistry,
				toolCalls: responseMessage.toolCalls,
			});

			const assistantToolCallResponseMessages =
				this.provider.adapters.toToolCallResponseMessages({
					toolCallResults,
				});

			assistantToolCallResponseMessages.forEach((message) => {
				this.chatMessageManager.addToMessages({
					message,
				});
			});

			this.interactionLogger.logChatMessages();

			toolCallResponseMessage = await this.provider.sendPrompt();

			this.interactionLogger.logModelResponse({
				message: toolCallResponseMessage,
			});
		}

		return toolCallResponseMessage;
	}
}
