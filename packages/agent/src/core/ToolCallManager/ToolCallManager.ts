import { ToolRegistryManager } from '@core/ToolRegistryManager';
import type { Provider } from '@core/providers/BaseProvider/common/types';
import type { ChatMessageManager } from '@sparrowstack/chat-message-manager';
import type { InteractionLogger } from '@core/InteractionLogger/InteractionLogger';
import type { ModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import { executeToolCalls } from '@core/ToolCallManager/methods/executeToolCalls/executeToolCalls';

interface ConstructorParams {
	provider: Provider;
	interactionLogger: InteractionLogger;
	chatMessageManager: ChatMessageManager;
	toolRegistryManager: ToolRegistryManager;
}

export class ToolCallManager {
	readonly provider: Provider;
	readonly interactionLogger: InteractionLogger;
	readonly chatMessageManager: ChatMessageManager;
	readonly toolRegistryManager: ToolRegistryManager;
	private onRequestPermission?: ({
		message,
	}: {
		message: string;
	}) => Promise<boolean>;

	constructor({
		provider,
		toolRegistryManager,
		interactionLogger,
		chatMessageManager,
	}: ConstructorParams) {
		this.provider = provider;
		this.interactionLogger = interactionLogger;
		this.chatMessageManager = chatMessageManager;
		this.toolRegistryManager = toolRegistryManager;
	}

	public setRequestPermissionHandler(
		handler: ({ message }: { message: string }) => Promise<boolean>,
	) {
		this.onRequestPermission = handler;
	}

	// Note: Could probably do some cleaning up here
	// as this is a large method. But still working
	// out all features needed for tool calls so keeping
	// as is for now to have all code in one place.
	public async handleToolCalls({
		responseMessage,
	}: {
		responseMessage: ModelResponse;
	}): Promise<ModelResponse> {
		// If no tool calls, return the original response
		if (
			!Array.isArray(responseMessage.toolCalls) ||
			responseMessage.toolCalls.length === 0
		) {
			return responseMessage;
		}

		// Handle the current batch of tool calls

		// Convert model response to tool call request message
		const assistantToolCallRequestMessage =
			this.provider.adapters.toToolCallRequestMessage({
				responseMessage,
			});

		// In the case of mulitple tool calls
		// some Providers require new messages for each tool call request
		// the forEach below handles this use case
		if (Array.isArray(assistantToolCallRequestMessage)) {
			assistantToolCallRequestMessage.forEach((message: any) => {
				this.chatMessageManager.addToMessages({
					message,
				});
			});
			// The rest of Providers require a single message (with multiple tool call requests defined)
			// the below handles this use case
		} else {
			this.chatMessageManager.addToMessages({
				message: assistantToolCallRequestMessage,
			});
		}

		// Execute tool calls
		const toolCallResults = await executeToolCalls({
			model: this.provider.model,
			providerName: this.provider.name,
			toolCalls: responseMessage.toolCalls,
			systemPrompt: this.provider.systemPrompt,
			chatMessageManager: this.chatMessageManager,
			onRequestPermission: this.onRequestPermission,
			toolRegistryManager: this.toolRegistryManager,
		});

		// Convert tool call results to tool call response messages
		const toolCallResponseMessages =
			this.provider.adapters.toToolCallResponseMessages({
				toolCallResults,
			});

		// Add tool call response messages to chat history
		toolCallResponseMessages.forEach((message: any) => {
			this.chatMessageManager.addToMessages({
				message,
			});
		});

		// Get the model's response to the tool call results
		const toolCallResponseMessage = await this.provider.sendPrompt();

		// OpenAI and Google send a batch of tool calls in the same message
		// we handle above..
		//
		// Anthropic will send tool calls in subsequent messages
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
