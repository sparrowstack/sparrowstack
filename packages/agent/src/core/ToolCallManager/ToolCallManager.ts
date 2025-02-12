import { ToolRegistry } from '@core/ToolRegistry';
import type { AIProvider } from '@core/providers/BaseProvider/common/types';
import { executeToolCalls } from '@core/ToolCallManager/execute/executeToolCalls/executeToolCalls';
import type { InteractionLogger } from '@core/InteractionLogger/InteractionLogger';
import type { IModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import type { ChatMessageManager } from '@core/ChatMessageManager';

interface IConstructorParams {
	provider: AIProvider;
	toolRegistry: ToolRegistry;
	interactionLogger: InteractionLogger;
	chatMessageManager: ChatMessageManager;
}

export class ToolCallManager {
	readonly provider: AIProvider;
	readonly toolRegistry: ToolRegistry;
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
	}): Promise<IModelResponse> {
		// If no tool calls, return the original response
		if (
			!Array.isArray(responseMessage.toolCalls) ||
			responseMessage.toolCalls.length === 0
		) {
			return responseMessage;
		}

		// Handle the current batch of tool calls
		const assistantToolCallRequestMessage =
			this.provider.adapters.toToolCallRequestMessage({
				responseMessage,
			});

		this.chatMessageManager.addToMessages({
			message: assistantToolCallRequestMessage,
		});

		// Execute tool calls
		const toolCallResults = await executeToolCalls({
			model: this.provider.model,
			toolRegistry: this.toolRegistry,
			providerName: this.provider.name,
			toolCalls: responseMessage.toolCalls,
			systemPrompt: this.provider.systemPrompt,
			chatMessageManager: this.chatMessageManager,
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

		// Get the model's response to the tool call results
		const toolCallResponseMessage = await this.provider.sendPrompt();

		// OpenAI: will send a batch of tool calls in the same message
		// Anthropic: will send tool calls in subsequent messages
		//
		// This recursive call will help us handle both cases (mainly for Anthropic)
		//
		// Recursively handle any additional tool calls in the response
		if (
			Array.isArray(toolCallResponseMessage.toolCalls) &&
			toolCallResponseMessage.toolCalls.length > 0
		) {
			return this.handleToolCalls({
				responseMessage: toolCallResponseMessage,
			});
		}

		return toolCallResponseMessage;
	}
}
