import type { BaseLLM } from '@Agent/core/BaseLLM';
import type { IModelResponse } from '@Agent/common/interfaces';

export class ToolCallManager {
	static async handleToolCalls({
		llm,
		responseMessage,
	}: {
		llm: BaseLLM;
		responseMessage: IModelResponse;
	}) {
		let toolCallResponseMessage: IModelResponse | null = null;

		if (
			Array.isArray(responseMessage.toolCalls) &&
			responseMessage.toolCalls.length > 0
		) {
			llm.interactionLogger.logModelResponse({
				message: responseMessage,
			});

			const assistantToolCallRequestMessage =
				llm.provider.adapters.toToolCallRequestMessage({
					responseMessage,
				});

			// ToolCallMessageRequestManager.add()
			llm.chatMessageManager.addToMessages({
				message: assistantToolCallRequestMessage,
			});

			// Execute tool calls
			const toolCallResults = await Promise.all(
				responseMessage.toolCalls.map(async (toolCall) => {
					const { id, name, parameters } = toolCall;
					const toolCallFunction = llm.functions![name];
					// TODO: JSON.parse(toolCall.function.arguments);
					const result = await toolCallFunction(parameters);

					return { id, result };
				}),
			);

			const assistantToolCallResponseMessages =
				llm.provider.adapters.toToolCallResponseMessages({
					toolCallResults,
				});

			// ToolCallMessageResponseManager.add()
			assistantToolCallResponseMessages.forEach((message) => {
				llm.chatMessageManager.addToMessages({
					message,
				});
			});

			// Log latest messages
			llm.interactionLogger.logMessages({
				messages: llm.chatMessageManager.getMessages(),
			});

			toolCallResponseMessage = await llm.provider.sendPrompt({
				llm,
			});

			llm.interactionLogger.logModelResponse({
				message: toolCallResponseMessage,
			});
		}

		return toolCallResponseMessage;
	}
}
