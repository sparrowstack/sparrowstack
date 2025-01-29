import type { OpenAIProvider } from '@Agent/core/providers/OpenAIProvider/OpenAIProvider';
import type { AnthropicProvider } from '@Agent/core/providers/AnthropicProvider/AnthropicProvider';
import type { IModelResponse } from '@Agent/common/interfaces';
import type { InteractionLogger } from '@Agent/core/InteractionLogger/InteractionLogger';
import type { ChatMessageManager } from '@Agent/core/ChatMessageManager/ChatMessageManager';

interface IConstructorParams {
	// TODO: Abstract interface
	provider: OpenAIProvider | AnthropicProvider;
	// TODO: Abstract interface
	functions:
		| Record<string, (...args: unknown[]) => Promise<unknown>>
		| undefined;
	interactionLogger: InteractionLogger;
	chatMessageManager: ChatMessageManager;
}

export class ToolCallManager {
	readonly functions:
		| Record<string, (...args: unknown[]) => Promise<unknown>>
		| undefined;
	readonly provider: OpenAIProvider | AnthropicProvider;
	readonly interactionLogger: InteractionLogger;
	readonly chatMessageManager: ChatMessageManager;

	constructor({
		provider,
		functions,
		interactionLogger,
		chatMessageManager,
	}: IConstructorParams) {
		this.provider = provider;
		this.interactionLogger = interactionLogger;
		this.chatMessageManager = chatMessageManager;
		this.functions = functions;
	}

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
			const toolCallResults = await Promise.all(
				responseMessage.toolCalls.map(async (toolCall) => {
					const { id, name, parameters } = toolCall;
					const toolCallFunction = this.functions![name];
					// TODO: JSON.parse(toolCall.function.arguments);
					const result = await toolCallFunction(parameters);

					return { id, result };
				}),
			);

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
